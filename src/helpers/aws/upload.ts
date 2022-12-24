import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default async function UploadFile(fileName: string, file: any) {
  const uploadedImage = await s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: fileName,
      Body: file,
    })
    .promise();
  return uploadedImage.Location;
}
