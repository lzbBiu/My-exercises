window.onload = function() {
    new Visualizer().ini();
};
var Visualizer = function() {
    this.file = null;
    this.fileName = null;
    this.audioContext = null;
    this.source = null;
    this.info = document.getElementById('info').innerHTML;
    this.infoUpdateId = null;
    this.animationId = null;
    this.status = 0;
    this.forceStop = false;
    this.allCapsReachBottom = false;
};
Visualizer.prototype = {
    ini: function() {
        this._prepareAPI();
        this._addEventListner();
    },
    _prepareAPI: function() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try {
            this.audioContext = new AudioContext();
        } catch (e) {
            this._updateInfo('!Your browser does not support AudioContext', false);
            console.log(e);
        }
    },
    _addEventListner: function() {
        var that = this,
            audioInput = document.getElementById('uploadedFile'),
            body = document.getElementsByTagName("body")[0];
        audioInput.onchange = function() {
            if (that.audioContext===null) {return;};
            if (audioInput.files.length !== 0) {
                that.file = audioInput.files[0];
                that.fileName = that.file.name;
                if (that.status === 1) {
                    that.forceStop = true;
                };
                document.getElementById('fileWrapper').style.opacity = 1;
                
                that._updateInfo('Uploading', true);
                that._start();
            };
        };
        body.addEventListener("dragenter", function() {
            document.getElementById('fileWrapper').style.opacity = 1;
            that._updateInfo('Drop it on the page', true);
        }, false);
        body.addEventListener("dragover", function(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }, false);
        body.addEventListener("dragleave", function() {
            document.getElementById('fileWrapper').style.opacity = 0.2;
            that._updateInfo(that.info, false);
        }, false);
        body.addEventListener("drop", function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (that.audioContext===null) {return;};
            document.getElementById('fileWrapper').style.opacity = 1;
            that._updateInfo('Uploading', true);
            that.file = e.dataTransfer.files[0];
            if (that.status === 1) {
                document.getElementById('fileWrapper').style.opacity = 1;
                that.forceStop = true;
            };
            that.fileName = that.file.name;
            that._start();
        }, false);
    },
    _start: function() {
        var that = this,
            file = this.file,
            fr = new FileReader();
        fr.onload = function(e) {
            var fileResult = e.target.result;
            var audioContext = that.audioContext;
            if (audioContext === null) {
                return;
            };
            that._updateInfo('Decoding the audio', true);
            audioContext.decodeAudioData(fileResult, function(buffer) {
                that._updateInfo('Decode succussfully,start the visualizer', true);
                that._visualize(audioContext, buffer);
            }, function(e) {
                that._updateInfo('!Fail to decode the file', false);
                console.error(e);
            });
        };
        fr.onerror = function(e) {
            that._updateInfo('!Fail to read the file', false);
            console.error(e);
        };
        this._updateInfo('Starting read the file', true);
        fr.readAsArrayBuffer(file);
    },
    _visualize: function(audioContext, buffer) {
        var audioBufferSouceNode = audioContext.createBufferSource(),
            analyser = audioContext.createAnalyser(),
            that = this;
        audioBufferSouceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        audioBufferSouceNode.buffer = buffer;
        //play the source
        if (!audioBufferSouceNode.start) {
            audioBufferSouceNode.start = audioBufferSouceNode.noteOn
            audioBufferSouceNode.stop = audioBufferSouceNode.noteOff 
        };
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.source !== null) {
            this.source.stop(0);
        }
        audioBufferSouceNode.start(0);
        this.status = 1;
        this.source = audioBufferSouceNode;
        audioBufferSouceNode.onended = function() {
            that._audioEnd(that);
        };
        this._updateInfo('Playing ' + this.fileName, false);
        this.info = 'Playing ' + this.fileName;
        document.getElementById('fileWrapper').style.opacity = 0.2;
        this._drawSpectrum(analyser);
    },
    _drawSpectrum: function(analyser) {
        var that = this,
            
            meterWidth = 10, 
            gap = 2, 
            capStyle = '#fff',
            meterNum = 800 / (10 + 2),
            capYPositionArray = []; 
        
        var drawMeter = function() {
        	
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            if (that.status === 0) {
                for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = 0;
                };
                allCapsReachBottom = true;
                if (allCapsReachBottom) {
                    cancelAnimationFrame(that.animationId);
                };
            };
            var step = Math.round(array.length / meterNum); 
            
            var cube = document.getElementsByClassName("cube");
            
            for (let i = 0; i < cube.length; i++) {
                var value = array[i]; 
                cube[i].style.transform="translateZ("+value/10+"em)";
            }
           
           that.animationId = requestAnimationFrame(drawMeter);
        }
        this.animationId = requestAnimationFrame(drawMeter);
    },
    _audioEnd: function(instance) {
        if (this.forceStop) {
            this.forceStop = false;
            this.status = 1;
            return;
        };
        this.status = 0;
        var text = 'HTML5 Audio API showcase | An Audio Viusalizer';
        document.getElementById('fileWrapper').style.opacity = 1;
        document.getElementById('info').innerHTML = text;
        instance.info = text;
        document.getElementById('uploadedFile').value = '';
    },
    _updateInfo: function(text, processing) {
        var infoBar = document.getElementById('info'),
            dots = '...',
            i = 0,
            that = this;
        infoBar.innerHTML = text + dots.substring(0, i++);
        if (this.infoUpdateId !== null) {
            clearTimeout(this.infoUpdateId);
        };
        if (processing) {
            var animateDot = function() {
                if (i > 3) {
                    i = 0
                };
                infoBar.innerHTML = text + dots.substring(0, i++);
                that.infoUpdateId = setTimeout(animateDot, 250);
            }
            this.infoUpdateId = setTimeout(animateDot, 250);
        };
    }
}
