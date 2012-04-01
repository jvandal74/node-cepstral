var fs = require('fs');
var exec = require('child_process').exec,
    child;
var say = exports;
say.speaker = 'swift';

exports.speak = function (id, voice, text, effect, callback) {
    var commands;
    if (arguments.length < 3) {
        console.log('invalid amount of arguments sent to speak()');
        return;
    }
    
    var tmpFile = '/tmp/' + id + '.tts';
    var outFile = '/tmp/' + id + '.wav';
    console.log("Generate TTS for " + id + " to " + tmpFile);
    fs.writeFileSync(tmpFile, text);
    
    commands = say.speaker + ' -p audio/sampling-rate=8000,audio/channels=1' + ' -n ' + voice + ' -m ssml -f ' + tmpFile + ' -o ' + outFile;
    if (effect) commands = commands + ' -x /opt/swift/sfx/' + effect + '.sfx';
    console.log("Execute command: %s", commands);
    var childD = exec(commands, function (error, stdout, stderr) {
        callback(error, id);
    });
}
