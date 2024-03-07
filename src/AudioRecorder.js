import React from 'react';
import './AudioRecorder.css';

// AudioRecorder component for capturing audio input and detecting a specific word
class AudioRecorder extends React.Component {
    constructor(props) { 
        super(props);

        this.recognition = null;
        this.isRecognizing = false;
        this.state = {
            recording: false, // flag indicating if recording is in progress
            recognized: false, // flag indicating if the word is recognized
            wordCount: 0, // counter for the number of times the word is detected
        };

        this.toDetect = 'לחזור'; // word to detect
    }

    // initializes the speech recognition functionality
    componentDidMount() {
        this.initializeRecognition();
    }

    
    // initializes the SpeechRecognition object and sets up event handlers
    initializeRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        // create a new instance of SpeechRecognition
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'he-IL'; // Set the language to Hebrew
        this.recognition.continuous = true; // Enable continuous recognition

        // define the event handler for the onresult event
        this.recognition.onresult = (event) => {
            
            const transcript = event.results[event.results.length - 1][0].transcript;
            console.log('Recognized transcript:', transcript);

            const matches = transcript.match(new RegExp(this.toDetect, 'g'));
            if (matches && matches.length > 0) {
                console.log(`Word "${this.toDetect}" detected ${matches.length} times`);
                this.setState((prevState) => ({ recognized: true, wordCount: prevState.wordCount + matches.length }));
            }
        };
    };

    
    // starts the speech recognition process
    startRecognition = () => {
        if (!this.isRecognizing) {
            this.isRecognizing = true;
            this.recognition.start();
        }
    };

    // stops the speech recognition process
    stopRecognition = () => {
        if (this.isRecognizing) {
            this.isRecognizing = false;
            this.recognition.stop();
        }
    };

    // starts the recording process by enabling speech recognition
    startRecording = () => {
        this.setState({ recording: true });
        this.startRecognition();
    };

    // stops the recording process by disabling speech recognition
    stopRecording = () => {
        this.setState({ recording: false });
        this.stopRecognition();
    };

    render() {
        const { recording, recognized, wordCount } = this.state;

        return (
        <div className="audio-recorder">
            <button className="record-button" onClick={this.startRecording} disabled={recording}>
            Start Recording
            </button>
            <button className="stop-button" onClick={this.stopRecording} disabled={!recording}>
            Stop Recording
            </button>
            {recognized && <p className="recognized-text">Word "{this.toDetect}" detected!</p>}
            {recognized && <p>Word count: {wordCount}</p>}
        </div>
        );
    }
}

export default AudioRecorder;
