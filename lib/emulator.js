(function (module, undefined){
    'use strict';
    
    var spawn = require('child_process').spawn;
    
    module.exports = function (){
        
        function parseTokens(text, cb){
            text.split()
        }
        
        return {
            run : function run(text, cb){

                var proc = spawn('node');
                var output = '';
                
                proc.stdout.on('data', function (data){
                    output = output + data;
                });
                
                proc.stdout.on('close', function (code){
                    cb(code, output);
                });
                
                proc.stderr.on('data', function (data){
                    cb(data.toString(), '');
                });
                
                proc.stdin.write(text);
                proc.stdin.end();
            }
        };
    };
    
})(module);