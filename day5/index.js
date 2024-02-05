const path = require('path');

function checkFileExtension(filePath, expectedExtension){
    const extname = path.extname(filePath);
    if(extname === expectedExtension){
        console.log(`File has the expected extension: ${extname}`);
    }
    else{
        console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${extname}`);
    }
}


//Test Cases.
checkFileExtension('test-files/file1.txt', '.txt');
checkFileExtension('test-files/image.png', '.jpg');
