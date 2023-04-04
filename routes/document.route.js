import express from "express"
import documentModel from "../models/document.model.js";
const router = express.Router()
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from "fs";
import serviceAccount from "../utils/serviceAccount.js";
import { async } from "@firebase/util";

import multer from "multer";
import {getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
// router.get("/:userId", async(req,res)=>{
//     try {
//         const userId = +req.params.userId || 0;
//         if (userId > 0){
//             const listSelfMade = await documentModel.listSelfMade(userId);
//             const listOtherMade = await documentModel.listOtherMade(userId);
//         }
//     }
//     catch (error) {
//         return res.status(400).json({
//             message: error.message
//         })
//     }
//
// })

router.post("/sign", async(req,res)=>{
    const pdfBytes = await fs.promises.readFile('./assets/test/07.pdf');

    const signatureBytes = await fs.promises.readFile('./assets/test/khuong.png');

    // Create a new PDF document from the existing file
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Embed the font
    // const helveticaFont = await pdfDoc.embedFont(fontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[req.body.current_page];

    // Calculate the position and size of the signature image
    const signatureImage = await pdfDoc.embedPng(signatureBytes);
    const signatureImageWidth = signatureImage.width
    const signatureImageHeight = signatureImage.height
    const signatureImageX = req.body.x_coor*firstPage.getWidth();
    const signatureImageY = req.body.y_coor*firstPage.getHeight();

    // Add the signature image to the first page
    firstPage.drawImage(signatureImage, {
        x: signatureImageX,
        y: signatureImageY,
        width: signatureImageWidth,
        height: signatureImageHeight,
    });

    // Add the signature text to the first page
    // const signatureText = 'Signed by Khuong';
    // // const signatureTextWidth = helveticaFont.widthOfTextAtSize(signatureText, 12);
    // const signatureTextX = firstPage.getWidth() - signatureImageWidth - 100;
    // const signatureTextY = 60 + signatureImageHeight;
    // firstPage.drawText(signatureText, {
    //     x: signatureTextX,
    //     y: signatureTextY,
    //     size: 12,
    //     color: rgb(0, 0, 0),
    // });

    // Serialize the PDF document and download it
    const pdfBytesWithSignature = await pdfDoc.save();
    fs.writeFileSync('signed.pdf', pdfBytesWithSignature);
    return res.status(200).json({
        message: "success"
    })
})
router.post("/fileDimension", async(req,res)=>{
    const fileName = req.body.fileName
    const imageName = req.body.imageName
    if (fileName == undefined){
        return res.status(200).json({
            message: "Please provide file name!"
        })
    }

    const pdfBytes = await fs.promises.readFile(fileName);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const signatureBytes = await fs.promises.readFile(imageName);
    const signatureImage = await pdfDoc.embedPng(signatureBytes);
    const signatureImageWidth = signatureImage.width
    const signatureImageHeight = signatureImage.height


    return res.status(200).json({
        fileWidth: firstPage.getWidth(),
        fileHeight: firstPage.getHeight(),
        imageWidth: signatureImageWidth,
        imageHeight: signatureImageHeight,
        message: "success"
    })
})

router.get("/test", async(req,res)=>{
    const bucket = serviceAccount.storage().bucket();
    const filePath = process.cwd() + '/assets/test/07.pdf'
    const file = bucket.file('user/jGzIwPIXM7RGcvvbDpJ10JYewUw1/documents/Nhom.pdf');

    file.save(fs.readFileSync(filePath), {
        metadata: {
            contentType: 'application/pdf'
        }
    }, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('File uploaded successfully.');
        }
    });
    return res.status(200).json({
        message: "success"
    })
})


// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async(req, res) => {
    if(!req.file) {
        return res.status(400).send("Error: No files found")
    } 

    const bucket = serviceAccount.storage().bucket();
    const blob = bucket.file('user/abYqBsQA8fgOMMnIO4N3iwwbztJ3/documents/Nhom.pdf')
    
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })
    
    blobWriter.on('error', (err) => {
        console.log(err)
    })
    
    blobWriter.on('finish', () => {
        res.status(200).send("File uploaded.")
    })
    
    blobWriter.end(req.file.buffer)
})

export default router