import inquirer from 'inquirer';
import qr from 'qr-image-dark';
import fs from 'fs';

inquirer
  .prompt([ {
    message: "Please enter your the full our your Qr-Code: ", 
    name: "qrCodeURL"
  },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const qrUrl = answers.qrCodeURL;

    var qr_svg = qr.image(qrUrl);
    qr_svg.pipe(fs.createWriteStream('QR-Code.png'));
    
    var svg_string = qr.imageSync('Qr-Code.png', { type: 'png' }); 
    fs.writeFile("QR-Code.txt", qrUrl + " This is your QrCode link in text file.", (error) => {
        if(error) throw error; 
        console.log("Qr-Code.txt is create successfully!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });