(function (window, $, ace, undefined){
    'use strict';
    
    var _ = require('underscore');
    var fs = require('fs');
    var util = require('util');
    var Emulator = require('./lib/emulator.js');
    var emulator = Emulator();

    $(document).ready(function (){

        var results = ace.edit("results");
        results.setTheme("ace/theme/monokai");
        results.getSession().setMode("ace/mode/text");
        results.commands.addCommand({
            name: 'Clear',
            bindKey: {win: 'Ctrl-W', mac: 'Command-W'},
            exec: function (results){
                results.setValue('');
            }
        });
        results.commands.addCommand({
            name: 'Editor Focus',
            bindKey: {win: 'Ctrl-1', mac: 'Command-1'},
            exec: function (results){
                editor.focus();
            }
        });
        
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");
        editor.commands.addCommand({
            name: 'Run',
            bindKey: {win: 'Ctrl-R',  mac: 'Command-R'},
            exec: function(editor) {
                emulator.run(editor.getValue(), _.once(function (err, text){
                    console.info('called');
                    if (err){
                        results.setValue(err);
                    } else {
                        results.setValue(text);
                    }
                }));
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });
        editor.commands.addCommand({
            name: 'Results Focus',
            bindKey: {win: 'Ctrl-2', mac: 'Command-2'},
            exec: function (results){
                results.focus();
            }
        });
        
        window.results = results;
        window.editor = editor;
        
        editor.focus();
    });
    
})(window, jQuery, ace);