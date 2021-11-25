var express = require('express');
var router = express.Router();
var userAddhelper = require('../helpers/userAddhelpers')
var registerUserhelpers = require('../helpers/registerUserhelpers')


/* GET home page. */
router.get('/',function(req, res, next) {
 
  if(req.session.user){
 let product= [
  {
    name:"Al Reem Kuzhimandi",
    description: "Arabian, Biryani",
    place:"Nedumbassery,Kochi",
    prize :"Rs.400",
    image:"https://b.zmtcdn.com/data/pictures/0/19356040/bcf4e285b8690f26a0fa10246ed8c8df_featured_v2.jpg"
  },

  {
    name:"Barbeque Nation",
    description: "North Indain, Kerala",
    place:"Kacheripadi, Kochi",
    prize :"Rs.1200",
    image:"https://b.zmtcdn.com/data/pictures/chains/9/900969/fcf8076b322d48db8c19a2751acc3520_featured_v2.jpg?output-format=webp"
  },

  {
    name:"Kochi Kitchen",
    description: "Italian, North Indian",
    place:"Kochi Marriott Hotel, Edappally",
    prize :"Rs.700",
    image:"https://b.zmtcdn.com/data/pictures/9/900539/c2f8662d10ad51759332ab354c4eeb11_featured_v2.jpg?output-format=webp"
  },

  {
    name:"Malabar Cafe",
    description: "Kerala",
    place:"Grand Hyatt Kochi Bolgatty, Kochi",
    prize :"Rs.2,400",
    image:"https://b.zmtcdn.com/data/pictures/chains/3/902863/3c6c1d254c06e9af6538057234aa791b_featured_v2.jpg?output-format=webp"
  },

  {
    name:"Nasi and Mee",
    description: "Malaysian, Thai",
    place:"MG Road,Kochi",
    prize :"Rs.1000",
    image:"https://b.zmtcdn.com/data/pictures/6/903046/878f111756a8cc97429a1e69ef847335_featured_v2.jpg?output-format=webp"
  },

  {
    name:"AL Taza",
    description: "Lebanese, Beverage",
    place:"Kaloor, Kochi",
    prize :"Rs.400",
    image:"https://b.zmtcdn.com/data/pictures/1/19098011/8e9d6cae23b48b38eb30e379b01a26d7_featured_v2.jpg?output-format=webp"
  },

  {
    name:"Arabian Palace",
    description: "Arabian",
    place:"Edappally, Kochi",
    prize :"Rs.700",
    image:"https://b.zmtcdn.com/data/pictures/0/901910/1cd2068e159274d012df23db06830714_featured_v2.jpg"
  },

  {
    name:"Westleys Restocafe",
    description: "cafe, Burger, Continental",
    place:"Palarivattom, Kochi",
    prize :"Rs.600",
    image:"https://b.zmtcdn.com/data/pictures/9/901159/ca7de87651c067ad852cc3dbcb70912a_featured_v2.jpg"
  },

  {
    name:"Cafe 17",
    description: "Italian, Continental",
    place:"Ravipuram,Kochi",
    prize :"Rs.400",
    image:"https://b.zmtcdn.com/data/pictures/2/19153752/6b9f9890ca641983700668dd5878e8ed_featured_v2.jpg"
  },

  {
    name:"Donut Factory",
    description: "Beverages, Italian",
    place:"Kakkanad, Kochi",
    prize :"Rs.500",
    image:"https://b.zmtcdn.com/data/pictures/chains/4/900904/92dbc02d4efed224005c228aef819d05_featured_v2.jpg"
  },

  {
    name:"Tharavadu Restaurant",
    description: "Kerala, North Indian",
    place:"Casino Hotel, Wellington Island",
    prize :"Rs.1200",
    image:"https://b.zmtcdn.com/data/pictures/9/95409/0ef2dc33e08b7b91b0e686eb67e1f2df_featured_v2.jpg"
  },

  {
    name:"Starbucks Cofee",
    description: "Cofee, Beverage",
    place:"Edappally, Kochi",
    prize :"Rs.600",
    image:"https://b.zmtcdn.com/data/pictures/chains/5/19525395/43ae3373d7c28765a8bafb2c12d2c61d_featured_v2.jpg"
  },

  {
    name:"Pandhal Cafe",
    description: "Cofee, Fast Food",
    place:"Panampilly Nagar,Kochi",
    prize :"Rs.550",
    image:"https://b.zmtcdn.com/data/pictures/3/19535973/0517036962143e8e363893c6b37a8bb9_featured_v2.jpg"
  },

  {
    name:"Royal Food Court",
    description: "Arabian, Chinese",
    place:"Perumbavoor, Kochi",
    prize :"Rs.300",
    image:"https://b.zmtcdn.com/data/pictures/chains/8/18980058/24fe4aaf40c1a855e52239e887c02a17_featured_v2.jpg"
  },

  {
    name:"Chicking",
    description: "Fast Food, Beverage",
    place:"Thopumpady, Kochi",
    prize :"Rs.400",
    image:"https://b.zmtcdn.com/data/pictures/chains/9/95089/13f1cea08e3d0343d683f7492abddfac_featured_v2.jpg"
  },

  {
    name:"Arippa Restaurant",
    description: "South Indian, Chinese",
    place:"Palarivattom, Kochi",
    prize :"Rs.800",
    image:"https://b.zmtcdn.com/data/pictures/chains/4/19430584/39de937d959ea37ca2e2a057f21a36cf_featured_v2.jpg"
  },

  {
    name:"D Bombay Junkiez",
    description: "Mughlai, Chinese",
    place:"Edappally, Kochi",
    prize :"Rs.400",
    image:"https://b.zmtcdn.com/data/pictures/9/19002939/d378210b6198cf8b48c170457a0a5eac_featured_v2.jpg"
  },

  {
    name:"Taco Bell",
    description: "Mexican, Fast Food",
    place:"Edappally, Kochi",
    prize :"Rs.550",
    image:"https://b.zmtcdn.com/data/pictures/9/18892879/9c56ceae1a9b36b3d18dc377cf86b08f_featured_v2.jpg"
  },

  {
    name:"Kashi Art Cafe",
    description: "Cafe, European",
    place:"Fort Kochi, Kochi",
    prize :"Rs.700",
    image:"https://b.zmtcdn.com/data/pictures/6/95256/12f1df26d627e24c1e598e3c1edba7f6_featured_v2.jpg"
  },

  {
    name:"McDOnald's",
    description: "Burger, Fast Food",
    place:"Edappally, Kochi",
    prize :"Rs.500",
    image:"https://b.zmtcdn.com/data/pictures/chains/4/95394/f325f5c3e4761fc65ae04435f70c816c_featured_v2.jpg"
  }
 ]
 
   res.render('homepage',{product, user:true})
 }
 else{
   res.redirect('/login')

 }
});

router.post('/',(req,res)=>{

  if(req.body.email === '' || req.body.password === '' || req.body.email === null || req.body.password === null) {
    req.session.loginNullErr = true
    res.redirect('/login')
  }
  else{
    registerUserhelpers.doLogin(req.body).then((response)=>{
      console.log(response.message);
      if(response.block){
        req.session.blockMessage = true
        res.redirect('/login');
      }
      else{
        if(response.status){
          req.session.loggedIn = true
          req.session.user = response.user
          req.session.blockMessage = false
          res.redirect('/')
        }
        else{
          req.session.userLoginErr="Invalid Username or Password"
          req.session.user = null;
          req.session.blockMessage = false
          res.redirect('/login')
        }
      }
      
    })
  }
    
})

router.get('/logout',(req,res)=>{
  req.session.user = null;
  req.session.loginErr = false;
  res.redirect('/login')
})



module.exports = router;
