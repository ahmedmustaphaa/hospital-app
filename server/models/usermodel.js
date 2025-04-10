import mongoose  from "mongoose";
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,default:'https://images.search.yahoo.com/images/view;_ylt=AwrFFEjNqKtnpTEOmrmJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2FmMDI4Njc3YmViYTViNTBkNTgyNzQ2MmUwMmI1ODYwBGdwb3MDNARpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3DPeople%26type%3DE210US91105G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D4&w=3780&h=2127&imgurl=images.pexels.com%2Fphotos%2F109919%2Fpexels-photo-109919.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D3%26h%3D750%26w%3D1260&rurl=https%3A%2F%2Fwww.pexels.com%2Fphoto%2Fpeople-brasil-guys-avpaulista-109919%2F&size=1050KB&p=People&oid=af028677beba5b50d5827462e02b5860&fr2=piv-web&fr=mcafee&tt=People+Walking+on+Pedestrian+Lane+during+Daytime+%C2%B7+Free+Stock+Photo&b=0&ni=21&no=4&ts=&tab=organic&sigr=IC1vLY0GkMkE&sigb=Hmf5M2.bmh4P&sigi=kkHYefU6jzUj&sigt=WXbyW55hG6Ql&.crumb=omISEnEhGJa&fr=mcafee&fr2=piv-web&type=E210US91105G0'},
    address:{type:String,default:"borg elboroles kfar elshifk egypt"},
    gender:{type:String,   default:"not selected"},
    dob:{type:String,   default:"not selected"},
    phone:{type:String, default:"1204579687"},
    
},{minimize:false})
const usermodel=mongoose.model('user',userSchema);
export default usermodel;