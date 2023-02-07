


export const uploadController =  (req,res) => {
    return res.status(200).json({img:req.file.filename})
}