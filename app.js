var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds");


// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

seedDB();

// Schema setup



// Campground.create({
//     name:"Children's Park", 
//     image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
// },function(err, campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Newly created campground ");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//     {name: "Picnic Hut", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Children's Park", image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name: "India Gate", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name: "Picnic Hut", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Children's Park", image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name: "India Gate", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
// ];

app.get('/',function(req,res){
    res.render("landing");
})

app.get('/campgrounds',function(req,res){
    Campground.find(function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    })
    
})

app.post('/campgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name:name, image:image, description:desc };
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
})

app.get('/campgrounds/new',function(req,res){
    res.render("new");
})

app.get('/campgrounds/:id',function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render('show',{campground : foundCampground});
        }
    })
   
})

app.listen(3000,function(req,res){
    console.log('YelpCamp server started!');
})