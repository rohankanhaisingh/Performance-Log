/*
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  Audio handler.
 * 
 *  audio/index.js
*/

import { setUniqueID } from "../uniqueID.js";

const audioCache = [];

class pt_Audio {
    #ctx;
    #octx;
    #convolver;
    #audio;
    #track;
    #gainNode;
    #panner;
    #analyser;
    #source;
    #bufferLength;
    #dataArray;

    /**
     * Creates a new Audio object.
     * @param {string} audioSource
     * @param {object} options
     * @param options.fttSize FTT Size of the audio track;
     */
    constructor(audioSource, options) {
        if (typeof audioSource !== 'undefined') {
            // Private fields.

            this.#audio = document.createElement("audio");
            this.#audio.src = audioSource;

            this.#ctx = new AudioContext();
            this.#octx = new OfflineAudioContext(2, 44100 * 40, 44100);
            //this.#convolver = this.#ctx.createConvolver();

            this.#track = this.#ctx.createMediaElementSource(this.#audio);


            // Identity
            this.id = setUniqueID(18);
            this.type = 'AUDIO_TRACK';


            // Modifying audio;

            // Gain
            this.#gainNode = this.#ctx.createGain();
            this.#gainNode.gain.value = .5;

            this.#track.connect(this.#gainNode).connect(this.#ctx.destination);
            

            // Frequencies 
            this.#analyser = this.#ctx.createAnalyser();
            this.#analyser.fftSize = 2048;
            this.#analyser.connect(this.#gainNode);

            this.#bufferLength = this.#analyser.frequencyBinCount;
            this.#dataArray = new Uint8Array(this.#bufferLength);
            this.#analyser.getByteFrequencyData(this.#dataArray);
            this.#track.connect(this.#analyser);


            // Public fields
            this.IsPlaying = false;
            this.Duration = this.#audio.duration;
            this.CurrentTime = this.#audio.currentTime;

            // Public field
            this.BufferLength = this.#analyser.frequencyBinCount;
            this.AnalyserFTTSize = this.#analyser.fttSize;

            //this.#track.connect(this.#ctx.destination);
            audioCache.push(this);

        } else {
            throw new Error("The audio source is not defined.");
            return;
        }
    }
    /**
     * Plays the audio track.
     * @param {number} time
     */
    Play(time) {
        if (typeof time == 'undefined') {
            if (this.#ctx.state === 'suspended') {
                this.#ctx.resume();
            }
            this.IsPlaying = true;
            this.#audio.play();
        } else {
            if (this.#ctx.state === 'suspended') {
                this.#ctx.resume();
            }

            this.#audio.currentTime = time;

            this.IsPlaying = true;
            this.#audio.play();
        }
    }
    /**
     * Pauses the audio.
     * */
    Pause() {
        this.IsPlaying = false;
        this.#audio.pause();
    }
    /**
     * Gain volume
     * @param {number} volume
     */
    Gain(volume) {
        this.#gainNode.gain.value = volume;
    }
    /**
     * Normal volume
     * @param {number} volume
     */
    Volume(volume) {
        this.#audio.volume = volume;
    }
    Panning(pan) {
        this.#panner.pan.value = pan;
    }
    Frequency() {
        this.#analyser.getByteFrequencyData(this.#dataArray);

        return this.#dataArray;
    }
    /**
     * 
     * @param {(32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 )} val
     */
    FTTSize(val) {
        if (typeof val !== 'undefined') {
            this.#analyser.fftSize = val;
            this.#bufferLength = this.#analyser.frequencyBinCount;
            this.#dataArray = new Uint8Array(this.#bufferLength);
            this.#analyser.getByteFrequencyData(this.#dataArray);

            this.BufferLength = this.#analyser.frequencyBinCount;
            this.AnalyserFTTSize = this.#analyser.fttSize;
        } else {
            return this.#analyser.fftSize;
        }
    }
    /**
     * 
     * @param {("play")} event
     * @param {Function} callback
     */
    On(event, callback) {
        switch (event) {
            case "play":
                this.#audio.ontimeupdate = () => {
                    this.CurrentTime = this.#audio.currentTime;

                    if (typeof callback !== 'undefined' && typeof callback == 'function') {
                        var obj = {
                            CurrentTime: this.CurrentTime,
                            Duration: this.#audio.duration
                        }
                        callback(obj);
                    }
                }
                break;
            case "end":
                this.#audio.onended = () => {
                    if (typeof callback !== 'undefined' && typeof callback == 'function') {
                        callback(self = this);
                    }
                }
                break;
        }
    }
    Destroy() {
        for (let i = 0; i < audioCache.length; i++) {
            if (audioCache[i].type == 'AUDIO_TRACK') {
                if (audioCache[i].id == this.id) {
                    this.#audio = undefined;

                    audioCache.splice(i);
                }
            }
        }
    }
    CreateAnalyzer() {

    }
    SetSource(source) {
        this.#audio.src = source;
    }
}

export { pt_Audio };