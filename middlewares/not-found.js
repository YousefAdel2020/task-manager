const notFound=(req,res)=>{
    res.status(404).send('404 can not find this page')
}


module.exports=notFound;