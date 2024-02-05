const cp = require('child_process');

function executeCommand(command){
    exec(command, (err, stdout, stderr)=>{
        if(err){
            console.log(`Error Occured : ${err}`);
        }
        else if(stderr){
            console.log(`Std Error : ${stderr}`);
        }
        else{
            console.log(`Std Output : ${stdout}`);
        }
    });
}
executeCommand('dir');
executeCommand('echo "Hello, Node.js!"');

