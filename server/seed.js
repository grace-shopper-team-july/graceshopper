const db = require('./db/db')
const {User, Product, Order, OrderLineItem} = require('./db/models/index')

/*const seedSpecies = [
    {
        name: 'Dog'
    },
    {
        name: 'Cat'
    },
    {
        name: 'Hedgehog'
    },
    {
        name: 'Reptile'
    },
    {
        name: 'Ferret'
    }
]
const seedCategory = [
    {
        name: 'Formal'
    },
    {
        name: 'Holiday'
    },
    {
        name: 'Rainwear'
    },
    {
        name: 'Costume'
    },
    {
        name: 'Accessories'
    },
    {
        name: 'Everyday'
    }
] */

const seedUsers = [
  {
    firstName: 'Admin',
    lastName: 'Boss',
    email: 'admin@admin.com',
    addressLine1: '1234 Main St',
    addressLine2: null,
    city: 'Bossville',
    state: 'Maryland',
    zip: '12233',
    phone: '1234567890',
    password: 'iamtheboss',
    admin: true
  },
  {
    firstName: 'Penny',
    lastName: 'Lane',
    email: 'penny@gmail.com',
    addressLine1: '335 Pine St',
    addressLine2: 'Apt 2C',
    city: 'Boston',
    state: 'Massachussets',
    zip: '00123',
    phone: '2647902345',
    password: 'monkeyclown',
    admin: false
  },
  {
    firstName: 'Johnny',
    lastName: 'Pickles',
    email: 'johnnyp@gmail.com',
    addressLine1: '264 Willow Drive',
    addressLine2: '3rd floor',
    city: 'Little Rock',
    state: 'Arkansas',
    zip: '62315',
    phone: '8651243367',
    password: 'picklesauseisoffensive',
    admin: false
  },
  {
    firstName: 'Wanda',
    lastName: 'Gelato',
    email: 'gelato@gmail.com',
    addressLine1: '623 Oak Lane',
    addressLine2: null,
    city: 'Atlanta',
    state: 'Georgia',
    zip: '23581',
    phone: '7268185624',
    password: 'hazelnut',
    admin: false
  },
  {
    firstName: 'Lucy',
    lastName: 'Chicken',
    email: 'chickenisgud@gmail.com',
    addressLine1: '563 Parker Ave',
    addressLine2: 'Apt 16B',
    city: 'Denver',
    state: 'Colorado',
    zip: '43651',
    phone: '6732641122',
    password: 'eatmorechicken',
    admin: false
  }
]

const seedProducts = [
  {
    name: 'pup-ceratops',
    description:
      'Organic raclette distillery fam messenger bag. DIY hammock freegan, try-hard kinfolk tote bag lomo brooklyn schlitz swag palo santo XOXO taxidermy godard vaporware. Marfa skateboard unicorn mumblecore, chicharrones palo santo blue bottle man bun pabst shoreditch. Letterpress semiotics umami biodiesel normcore fashion axe irony chillwave hot chicken actually gluten-free 8-bit. Mustache DIY mixtape pitchfork VHS brunch seitan scenester schlitz tofu godard mumblecore food truck. Kitsch shabby chic authentic humblebrag. Whatever tofu crucifix, vaporware viral mlkshk etsy occupy tote bag.',
    price: 39.99,
    imageUrl:
      'https://www.awesomeinventions.com/wp-content/uploads/2015/05/dog-dino.jpg',
    qoh: 30,
    species: 'dog'
  },
  {
    name: 'pup-achu',
    description: `Pabst intelligentsia you probably haven't heard of them, knausgaard YOLO bespoke chartreuse stumptown williamsburg live-edge portland. Squid meh tacos, migas paleo distillery chia whatever pok pok flannel. Ramps everyday carry fixie flexitarian. Tilde iceland readymade sriracha pok pok subway tile. Lomo squid beard, pok pok kombucha messenger bag butcher kogi austin brunch gochujang skateboard copper mug williamsburg bitters.`,
    price: 49.99,
    imageUrl:
      'https://ideastand.com/wp-content/uploads/2017/09/dog-halloween-costumes/4-dog-halloween-costume-diy-ideas.jpg',
    qoh: 20,
    species: 'dog'
  },
  {
    name: 'puppy-buffett',
    description: `Neutra direct trade +1 kinfolk. Knausgaard williamsburg leggings edison bulb, waistcoat brunch neutra pabst succulents fixie lyft poutine. Flannel semiotics pok pok, pinterest salvia cold-pressed helvetica retro marfa glossier mlkshk gentrify deep v. Flannel hell of health goth YOLO crucifix. Literally XOXO schlitz letterpress green juice man bun unicorn sriracha. Salvia twee ethical air plant wayfarers roof party man bun, raclette humblebrag +1 dreamcatcher. Aesthetic stumptown coloring book PBR&B art party small batch, direct trade 90's irony.`,
    price: 29.99,
    imageUrl:
      'https://img1.etsystatic.com/076/0/6915430/isla_fullxfull.15935439_rny2xj9r.jpg',
    qoh: 15,
    species: 'dog'
  },
  {
    name: 'puppy-potter',
    description: `Palo santo helvetica typewriter williamsburg squid, raw denim flannel shaman yr YOLO. Gentrify cred neutra wolf. Before they sold out street art glossier food truck cardigan plaid forage YOLO microdosing enamel pin VHS. Ramps godard yuccie wayfarers. Tattooed mustache church-key +1 kickstarter, woke taxidermy selvage.`,
    price: 19.99,
    imageUrl:
      'https://i.pinimg.com/236x/57/8c/20/578c2098b742646476b11839c616772d.jpg',
    qoh: 15,
    species: 'dog'
  },
  {
    name: 'hard-working-pup',
    description: `Viral retro small batch, celiac everyday carry put a bird on it squid thundercats aesthetic green juice cray. Locavore mixtape heirloom taxidermy asymmetrical pinterest. Artisan schlitz 90's banjo intelligentsia mlkshk. Asymmetrical freegan leggings fanny pack unicorn, before they sold out YOLO everyday carry raclette authentic pickled intelligentsia iceland tofu hella. Tbh vape mumblecore affogato 8-bit thundercats 90's franzen green juice heirloom everyday carry. Occupy banjo neutra, snackwave waistcoat tumblr jianbing before they sold out ethical.`,
    price: 39.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F78.media.tumblr.com%2F610745f556248572741b336689b256b1%2Ftumblr_oxtcakdf7Q1vuhuy0o1_500.jpg&f=1&nofb=1',
    qoh: 20,
    species: 'dog'
  },
  {
    name: 'cowboy-pup',
    description: `Ramps echo park glossier pour-over. Cloud bread waistcoat gentrify, fashion axe austin tacos pug umami master cleanse fam scenester you probably haven't heard of them put a bird on it health goth lomo. Disrupt photo booth cardigan mumblecore, beard schlitz roof party yuccie locavore. Shabby chic chia poke, intelligentsia put a bird on it drinking vinegar godard organic 8-bit +1 fam air plant art party yr.`,
    price: 59.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FHTB13K1BNVXXXXbDXpXXq6xXFXXXr%2FFunny-Dog-Costume-Pet-Dog-Clothes-Puppy-Coats-Jackets-for-Halloween-Dressing-Up-Party-Apparel-for.jpg&f=1&nofb=1',
    qoh: 10,
    species: 'dog'
  },
  {
    name: 'cozy-lil-sweater',
    description: `Palo santo roof party chambray, franzen vexillologist pork belly cray air plant keffiyeh YOLO. Yuccie heirloom tousled man bun, unicorn gluten-free austin you probably haven't heard of them swag actually. Palo santo vexillologist ethical hashtag narwhal. Franzen squid echo park tumeric disrupt tattooed swag fanny pack mustache jianbing cred keytar mlkshk. Coloring book tote bag YOLO offal, +1 whatever pabst tacos normcore ennui tousled trust fund cloud bread art party chillwave. Pok pok wayfarers cred, selvage church-key pour-over hell of fixie waistcoat taxidermy. Lumbersexual taiyaki pabst blue bottle poke woke.`,
    price: 39.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdogcostumenetwork.files.wordpress.com%2F2015%2F07%2Fdachshund-clothing-1.jpg&f=1&nofb=1',
    qoh: 15,
    species: 'dog'
  },
  {
    name: 'pup-on-the-town',
    description: `Meditation pinterest freegan PBR&B. Leggings chia keffiyeh sartorial hashtag. Af hella tumblr subway tile beard lomo listicle mustache mumblecore organic slow-carb chartreuse enamel pin ennui raclette. Twee taxidermy occupy authentic brunch. Mlkshk mumblecore godard ennui, retro aesthetic neutra direct trade hammock subway tile brooklyn semiotics. Yuccie actually chicharrones crucifix iPhone biodiesel kogi prism, everyday carry health goth echo park lumbersexual heirloom. Jean shorts single-origin coffee YOLO vexillologist pabst knausgaard, mumblecore asymmetrical ramps kale chips chillwave taxidermy blue bottle humblebrag.`,
    price: 59.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.glamour.com%2Fphotos%2F56964c4016d0dc3747ef9b95%2Fmaster%2Fw_1600%252Cc_limit%2Ffashion-2015-08-ruby-rufus-dog-insweater-4-main.jpg&f=1&nofb=1',
    qoh: 15,
    species: 'dog'
  },
  {
    name: 'le-pup',
    description: `3 wolf moon tacos yr woke jianbing kale chips scenester meditation. Fam put a bird on it knausgaard quinoa etsy pug banh mi leggings venmo shabby chic gochujang thundercats bicycle rights authentic. Shoreditch street art adaptogen seitan irony pitchfork cornhole hella pop-up kombucha drinking vinegar kitsch chartreuse hell of glossier. Vexillologist synth cliche wolf venmo mumblecore subway tile shaman lumbersexual af tumeric vinyl marfa shabby chic.`,
    price: 69.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgoodtoknow.media.ipcdigital.co.uk%2F111%2F00001008a%2F5e06_orh100000w614%2Finstagram-dapper-dog.jpeg&f=1&nofb=1',
    qoh: 15,
    species: 'dog'
  },
  {
    name: 'snow-pup',
    description: `Actually XOXO paleo four loko bespoke pork belly occupy hell of. Vape beard locavore hot chicken bushwick succulents hammock scenester plaid asymmetrical. Neutra cardigan affogato polaroid green juice kogi XOXO unicorn. Thundercats raw denim shabby chic locavore narwhal PBR&B YOLO quinoa typewriter migas iceland tote bag tumeric cold-pressed. VHS seitan waistcoat pop-up kombucha slow-carb. Snackwave selvage stumptown, migas jianbing literally sriracha tote bag photo booth pabst distillery.`,
    price: 49.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpetsnurturing.com%2Fwp-content%2Fuploads%2F2019%2F01%2FDog-Winter-Clothes-7.jpg&f=1&nofb=1',
    qoh: 20,
    species: 'dog'
  },
  {
    name: 'pup-tux',
    description:
      'This East Side Collection "Yappily Ever After" Groom Tuxedo for dogs makes it easy to include pets in the wedding-day fun. White satin shirt is paired with a double-breasted tux coat with tails. A sharp-looking suit for the dog of the hour. Comfortable, easy-fit design with velcro closures and a high-cut belly.',
    price: 20.8,
    imageUrl:
      'https://i.pinimg.com/originals/9e/be/13/9ebe136ca3998581e13eae146714d2d6.jpg ',
    qoh: 35
  },
  {
    name: 'santas-lil-pupper',
    description:
      'Dress up your pupp as Santas helper this Holiday season! Great for holiday cards or pictures.',
    price: 19.45,
    imageUrl:
      'https://cdn11.bigcommerce.com/s-dppmv5/images/stencil/608x608/products/42578/59648/Elf_Pet-Dog_costume_PupRwear.550__74279.1537995369.jpg?c=2',
    qoh: 47,
    species: 'dog'
  },
  {
    name: 'spider-pup',
    description:
      'Transform your dog into a the biggest, friendliest spider this Halloween season. With a set of 4 extra legs and 4 extra eyes, your pup is sure to put on a scare!',
    price: 24.99,
    imageUrl:
      'https://images.halloweencostumes.com/products/39940/1-1/spider-pup-costume.jpg',
    qoh: 7,
    species: 'dog'
  },
  {
    name: 'pj-pup',
    description:
      'Keep your puppy warm and cozy during its peaceful sleep in this adorable set of piggy-patterned jammies!',
    price: 13.59,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71Xf-s%2BdHHL._AC_SL1500_.jpg',
    qoh: 21,
    species: 'dog'
  },
  {
    name: 'puppy-bow',
    description:
      'Dress up your pup with these cute bows. Buy one for everyday of the week!',
    price: 6.0,
    imageUrl:
      'https://i.etsystatic.com/20527859/r/il/3fdaad/2005158613/il_794xN.2005158613_p7zq.jpg',
    qoh: 3,
    species: 'dog'
  },
  {
    name: 'puppy-dog',
    description: `Single-origin coffee knausgaard migas fashion axe venmo. Godard readymade disrupt sartorial bespoke, cold-pressed tofu mixtape hexagon letterpress four dollar toast flexitarian. Woke lomo offal, chicharrones williamsburg iPhone pickled. Copper mug woke swag, vice typewriter iPhone chambray air plant +1 letterpress.`,
    price: 24.99,
    imageUrl:
      'https://lia-griffith-media.s3.us-west-2.amazonaws.com/wp-content/uploads/2018/10/Hot_Dog_Halloween_Costume_2.jpg',
    qoh: 10,
    species: 'dog'
  },
  {
    name: 'puppy-taco',
    description: `lumbersexual fixie mumblecore glossier vice scenester food truck vaporware pabst 8-bit freegan viral mustache. sartorial pitchfork lomo, succulents adaptogen enamel pin austin yuccie iphone scenester ramps shabby chic photo booth. cred jianbing biodiesel, craft beer synth fanny pack man braid lomo paleo mlkshk. twee umami thundercats, kickstarter etsy adaptogen bespoke pour-over trust fund shabby chic photo booth lomo viral. health goth vice whatever cornhole meggings jianbing truffaut pork belly irony brooklyn. selvage disrupt post-ironic kinfolk bushwick chicharrones pinterest mumblecore truffaut keffiyeh hexagon.`,
    price: 19.99,
    imageUrl:
      'https://i.pinimg.com/originals/ee/1b/e4/ee1be4ceb63a559b0987231bea4b9aaa.jpg',
    qoh: 9,
    species: 'dog'
  },
  {
    name: 'puppy-gingerbread',
    description: `salvia banjo disrupt etsy diy tbh. bicycle rights wolf post-ironic copper mug. vaporware taiyaki normcore hella drinking vinegar adaptogen palo santo snackwave pug green juice edison bulb vegan church-key butcher. portland gluten-free humblebrag hell of snackwave +1 iceland air plant mustache vape hoodie pbr&b put a bird on it crucifix ethical. plaid post-ironic squid, vhs cardigan xoxo tumeric master cleanse next level wayfarers swag succulents tattooed ethical aesthetic. aesthetic flexitarian freegan, jean shorts tattooed blog authentic.`,
    price: 15.99,
    imageUrl:
      'https://img.chewy.com/is/image/catalog/132212_MAIN._AC_SL1500_V1540326487_.jpg',
    qoh: 4,
    species: 'dog'
  },
  {
    name: 'doggy-wellies',
    description: `actually crucifix narwhal roof party palo santo kombucha portland 3 wolf moon 8-bit swag artisan unicorn. plaid blue bottle lyft next level. blog put a bird on it marfa tattooed pickled. mumblecore man braid occupy pok pok forage. echo park tote bag put a bird on it, taxidermy butcher bitters irony air plant. pinterest vaporware farm-to-table seitan hot chicken xoxo.`,
    price: 10.99,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1811/2867/products/36_cf404a44-8451-4fff-81cc-11c25db0645c_1800x1800.png?v=1581350346',
    qoh: 15,
    species: 'dog'
  },
  {
    name: 'canada-woof',
    description: `cray man bun skateboard helvetica marfa post-ironic +1 sustainable. small batch you probably haven't heard of them blue bottle, +1 cornhole iceland food truck. air plant viral taiyaki sriracha pitchfork single-origin coffee cardigan pour-over williamsburg cornhole bitters brooklyn tattooed lomo sustainable. tilde cronut roof party, truffaut craft beer knausgaard celiac sustainable crucifix pitchfork butcher pork belly raw denim. austin mixtape cronut, yr keytar fanny pack cloud bread.`,
    price: 59.99,
    imageUrl:
      'https://www.supremepawsupply.com/wp-content/uploads/2020/01/products-e40931e2.jpg',
    qoh: 5,
    species: 'dog'
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    name: 'cat-ears',
    description: `cray man bun skateboard helvetica marfa post-ironic +1 sustainable. small batch you probably haven't heard of them blue bottle, +1 cornhole iceland food truck. air plant viral taiyaki sriracha pitchfork single-origin coffee cardigan pour-over williamsburg cornhole bitters brooklyn tattooed lomo sustainable. tilde cronut roof party, truffaut craft beer knausgaard celiac sustainable crucifix pitchfork butcher pork belly raw denim. austin mixtape cronut, yr keytar fanny pack cloud bread.`,
    price: 29.99,
    imageUrl:
      'https://ae01.alicdn.com/kf/HTB1mFWabKLM8KJjSZFqq6y7.FXaz/Cute-Cat-Clothes-Easter-Rabbit-Animals-Clothing-Costume-Fleece-Warm-Cat-Clothes-Coat-Jackets-Outfit-for.jpg',
    qoh: 30,
    species: 'cat'
  },
  {
    name: 'pizza-kitty',
    description: `actually crucifix narwhal roof party palo santo kombucha portland 3 wolf moon 8-bit swag artisan unicorn. plaid blue bottle lyft next level. blog put a bird on it marfa tattooed pickled. mumblecore man braid occupy pok pok forage. echo park tote bag put a bird on it, taxidermy butcher bitters irony air plant. pinterest vaporware farm-to-table seitan hot chicken xoxo.`,
    price: 19.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg0.etsystatic.com%2F125%2F1%2F10706456%2Fil_570xN.1022817008_31jv.jpg&f=1&nofb=1',
    qoh: 10,
    species: 'cat'
  },
  {
    name: 'tuxedo-cat',
    description: `salvia banjo disrupt etsy diy tbh. bicycle rights wolf post-ironic copper mug. vaporware taiyaki normcore hella drinking vinegar adaptogen palo santo snackwave pug green juice edison bulb vegan church-key butcher. portland gluten-free humblebrag hell of snackwave +1 iceland air plant mustache vape hoodie pbr&b put a bird on it crucifix ethical. plaid post-ironic squid, vhs cardigan xoxo tumeric master cleanse next level wayfarers swag succulents tattooed ethical aesthetic. aesthetic flexitarian freegan, jean shorts tattooed blog authentic.`,
    price: 29.99,
    imageurl:
      'https://i.pinimg.com/originals/c2/d1/cd/c2d1cd15d057ce092513b972187dfbae.jpg',
    qoh: 20,
    species: 'cat'
  },
  {
    name: 'mario-cat-hat',
    description: `Portland jean shorts fingerstache knausgaard, thundercats tumblr taxidermy hella sriracha whatever cornhole yuccie chia jianbing. Succulents fixie portland intelligentsia deep v brunch ethical forage, gastropub chartreuse swag vexillologist tumeric stumptown selfies. Poutine etsy man braid cred roof party slow-carb. Food truck adaptogen brooklyn air plant ethical kale chips flannel chicharrones. Put a bird on it raclette kinfolk pickled.`,
    price: 19.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.top13.net%2Fwp-content%2Fuploads%2F2016%2F10%2Fhalloween-costumes-kittens-3.jpg&f=1&nofb=1',
    qoh: 10,
    species: 'cat'
  },
  {
    name: 'cat-burger',
    description: `lumbersexual fixie mumblecore glossier vice scenester food truck vaporware pabst 8-bit freegan viral mustache. sartorial pitchfork lomo, succulents adaptogen enamel pin austin yuccie iphone scenester ramps shabby chic photo booth. cred jianbing biodiesel, craft beer synth fanny pack man braid lomo paleo mlkshk. twee umami thundercats, kickstarter etsy adaptogen bespoke pour-over trust fund shabby chic photo booth lomo viral. health goth vice whatever cornhole meggings jianbing truffaut pork belly irony brooklyn. selvage disrupt post-ironic kinfolk bushwick chicharrones pinterest mumblecore truffaut keffiyeh hexagon.`,
    price: 29.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-oPUUI0YqsdQ%2FUpShG9uyTUI%2FAAAAAAAAFVs%2FSPEwflew-GQ%2Fs1600%2FFunny-Halloween-Costumes-for-Cats.jpg&f=1&nofb=1',
    qoh: 15,
    species: 'cat'
  },
  {
    name: 'lion-kitty',
    description: `Single-origin coffee knausgaard migas fashion axe venmo. Godard readymade disrupt sartorial bespoke, cold-pressed tofu mixtape hexagon letterpress four dollar toast flexitarian. Woke lomo offal, chicharrones williamsburg iPhone pickled. Copper mug woke swag, vice typewriter iPhone chambray air plant +1 letterpress.`,
    price: 19.99,
    imageUrl:
      'https://imgix.bustle.com/uploads/image/2017/10/3/42baa108-aaf5-488b-a60a-aaed5a66f5e9-cat_lion_costume.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format&q=70',
    qoh: 15,
    species: 'cat'
  },
  {
    name: 'kitty-witch',
    description: `Single-origin coffee knausgaard migas fashion axe venmo. Godard readymade disrupt sartorial bespoke, cold-pressed tofu mixtape hexagon letterpress four dollar toast flexitarian. Woke lomo offal, chicharrones williamsburg iPhone pickled. Copper mug woke swag, vice typewriter iPhone chambray air plant +1 letterpress.`,
    price: 19.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.popsugar-assets.com%2Ffiles%2Fthumbor%2FdWnmOHAx4Wo10ahRwzxBH-3kBHg%2Ffit-in%2F1024x1024%2Ffilters%3Aformat_auto-!!-%3Astrip_icc-!!-%2F2019%2F08%2F16%2F735%2Fn%2F1922243%2Fca9f2c965d56dc3a0c2bb6.16163769_2%2Fi%2FVampire-Cape-Hat-Cat-Costume.jpg&f=1&nofb=1',
    qoh: 15,
    species: 'cat'
  },
  {
    name: 'le-kitty',
    description: `Butcher venmo meditation, poke trust fund helvetica squid. Asymmetrical heirloom chicharrones, bushwick migas photo booth XOXO cloud bread paleo selfies street art kickstarter cray. Selvage photo booth vaporware helvetica readymade 90's lyft knausgaard flannel. Meh cornhole man braid, blog portland ramps artisan.`,
    price: 39.99,
    imageUrl:
      'https://cdn.costumewall.com/wp-content/uploads/2015/09/cute-cat-costumes-29.jpg',
    qoh: 25,
    species: 'cat'
  },
  {
    name: 'bad-kitty',
    description: `Gluten-free gochujang tumblr distillery twee cred. Four dollar toast woke actually yuccie raclette kinfolk flexitarian. Franzen butcher selfies flexitarian, neutra crucifix cray cronut waistcoat tattooed af VHS. Gochujang cronut iceland vinyl bespoke vape. Try-hard flannel iPhone irony beard cardigan tattooed quinoa. Hoodie occupy affogato, keytar microdosing ugh actually air plant kickstarter typewriter 8-bit yr disrupt kombucha chia. Letterpress food truck marfa meditation, aesthetic narwhal heirloom chillwave whatever typewriter crucifix schlitz cray sriracha pok pok.`,
    price: 29.99,
    imageUrl:
      'http://www.wishforpets.com/wp-content/uploads/2014/12/Cat-devil-costumes8.jpg',
    qoh: 15,
    species: 'cat'
  },
  {
    name: 'kitty-taco',
    description: `Distillery mumblecore microdosing, mlkshk mustache lomo typewriter banjo. Master cleanse taiyaki tofu selfies raclette. Vice poke gluten-free irony hella tilde kombucha. Vinyl asymmetrical vaporware, pop-up hella mumblecore artisan cronut polaroid slow-carb sartorial banh mi.`,
    price: 49.99,
    imageUrl: 'http://www.hepper.com/wp-content/uploads/2017/10/tacocat.jpg',
    qoh: 20,
    species: 'cat'
  },
  {
    name: 'cat-coveralls',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    price: 36.98,
    imageUrl:
      'https://i.pinimg.com/originals/99/32/21/9932215264fd7afa45b499acdb92aa4c.jpg',
    qoh: 52,
    species: 'cat'
  },
  {
    name: 'christmas-cat',
    description:
      'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    price: 31.9,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrmFuBLmxYsr0MNYcErxOwVVZvESiPzLXf0Q&usqp=CAU',
    qoh: 78,
    species: 'cat'
  },
  {
    name: 'kitty-collar',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    price: 45.32,
    imageUrl:
      'https://ae01.alicdn.com/kf/H44ef5e09863c4d5c8e5d63f1387dc8a4A/Pet-ID-Collar-Shining-Diamond-Rhinestone-Cat-Collar-Puppy-Baby-Dog-Cat-Collar-Paw-Pattern-Strap.jpg',
    qoh: 23,
    species: 'cat'
  },
  {
    name: 'pizza-cat',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 24.77,
    imageUrl:
      'https://i.pinimg.com/originals/c5/cd/ed/c5cdedae6551f9124241e886dfebdc7a.jpg',
    qoh: 4,
    species: 'cat'
  },
  {
    name: 'rainy-cat-coat',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    price: 12.99,
    imageUrl:
      'https://i.pinimg.com/originals/a4/3c/cf/a43ccfe4145b1e12480fc0b04e2624c8.jpg',
    qoh: 18,
    species: 'cat'
  },
  {
    name: 'cat-bonnet',
    description: `Letterpress slow-carb tousled artisan, art party vegan bushwick palo santo cray organic taxidermy coloring book +1 authentic chillwave. Kickstarter schlitz letterpress keffiyeh. Ugh fixie disrupt brooklyn taiyaki, hashtag taxidermy tofu shoreditch post-ironic keytar try-hard. Flexitarian kogi lo-fi, heirloom jean shorts umami scenester sriracha you probably haven't heard of them.`,
    price: 8.99,
    imageUrl:
      'https://odditymall.com/includes/content/cat-bonnet-cat-hat-thumb.jpg',
    qoh: 25,
    species: 'cat'
  },
  {
    name: 'cat-gucci',
    description: `Single-origin coffee hashtag taiyaki vice, yuccie DIY vaporware before they sold out narwhal poke. Yuccie meditation man braid green juice tbh cliche. Gochujang iPhone chambray, affogato gluten-free meh +1 enamel pin brunch taxidermy lomo pug kinfolk yr artisan. Paleo cronut whatever williamsburg intelligentsia. Kogi selfies hammock pabst, dreamcatcher adaptogen austin kale chips jean shorts four loko vinyl deep v mumblecore. Heirloom XOXO affogato actually, post-ironic kickstarter activated charcoal hammock bespoke kale chips twee sustainable artisan pug.`,
    price: 470.0,
    imageUrl:
      'https://media.karousell.com/media/photos/products/2020/8/18/gucci_and_lv_pet_bowtie_collar_1597775954_3afb9338_progressive.jpg',
    qoh: 3,
    species: 'cat'
  },
  {
    name: 'cat-uniform',
    description: `Four loko mixtape meh jianbing hella crucifix vegan chambray cray irony. Hexagon hoodie chia tote bag mlkshk kickstarter shabby chic pinterest organic tumblr swag yuccie vexillologist blue bottle. Copper mug tote bag dreamcatcher next level photo booth neutra. Sriracha gochujang you probably haven't heard of them semiotics iPhone pok pok. Subway tile neutra tattooed hoodie.`,
    price: 38.74,
    imageUrl:
      'https://cdn.idntimes.com/content-images/community/2019/12/funny-dog-cat-costumes-high-school-uniform-cosplay-suit-pet-apparel-halloween-christmas-clothes-for-puppy-ec6faea02ac12265d1b2bb4111a6c1db.jpg',
    qoh: 5,
    species: 'cat'
  },
  {
    name: 'cat-jogger',
    description:
      'Et quidam graeco pro, vix ex repudiare expetendis. Cu mentitum suscipit iudicabit eam, ei cum decore iudicabit reformidans. Qui expetenda expetendis ut.',
    price: 34.0,
    imageUrl:
      'https://i2.wp.com/ae01.alicdn.com/kf/HTB1vAZ2atfvK1RjSspoq6zfNpXaq/Fashion-Cat-Clothes-For-Cats-Winter-Warm-Cotton-Cat-Clothing-For-Pets-Kitten-Outfit-Kedi-Gatto.jpg?fit=600%2C600&ssl=1',
    qoh: 5,
    species: 'cat'
  },
  {
    name: 'cat-geometric-sweater',
    description:
      'Ut eum utroque postulant, eu legimus lucilius sea, munere postea ocurreret ad nam. Ceteros tractatos ei mel, cu antiopam inimicus evertitur pri, sale salutatus voluptatum id nam.',
    price: 16.74,
    imageUrl:
      'https://ae01.alicdn.com/kf/Hb1b399fae8554199abadf6396a332264m/Summer-New-Fashion-Cat-Costume-Cat-Vest-Hoodie-Cozy-Mascoats-Clothes-For-Cats-Coat-Disfraz-Perro.jpg_q50.jpg',
    qoh: 7,
    species: 'cat'
  },
  {
    name: 'cat-flamingo-hat',
    description:
      'Vim habeo nostro iuvaret ut, sed ne partem quaeque, quod intellegat reformidans cum an. Sed solet cetero graecis at, corrumpit argumentum ne vim. Sit ex nibh sententiae, nam te dolorum fierent vituperata, audiam veritus philosophia pri ex. Cu fabulas voluptaria ius, eu nam enim tota.',
    price: 12.34,
    imageUrl:
      'https://instagifts.co/wp-content/uploads/2019/09/flamingo-cat-costume-640x602.jpg',
    qoh: 7,
    species: 'cat'
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    name: 'senor-hog',
    description: `Letterpress slow-carb tousled artisan, art party vegan bushwick palo santo cray organic taxidermy coloring book +1 authentic chillwave. Kickstarter schlitz letterpress keffiyeh. Ugh fixie disrupt brooklyn taiyaki, hashtag taxidermy tofu shoreditch post-ironic keytar try-hard. Flexitarian kogi lo-fi, heirloom jean shorts umami scenester sriracha you probably haven't heard of them.`,
    price: 39.99,
    imageUrl:
      'http://uploads.neatorama.com/images/posts/997/56/56997/1357192949-0.jpg',
    qoh: 15,
    species: 'hedgehog'
  },
  {
    name: 'dracula-hog',
    description: `Biodiesel snackwave drinking vinegar, DIY celiac lo-fi knausgaard. Flexitarian swag jianbing neutra squid fixie prism pabst coloring book selfies fingerstache authentic. Echo park master cleanse bicycle rights man bun edison bulb cronut, pok pok single-origin coffee try-hard pug helvetica. Hot chicken meggings pitchfork occupy dreamcatcher raw denim. Cold-pressed typewriter 3 wolf moon forage, dreamcatcher portland ennui. Shaman lumbersexual gastropub intelligentsia skateboard, venmo drinking vinegar you probably haven't heard of them bitters jianbing XOXO brunch vexillologist blog pop-up.`,
    price: 49.99,
    imageUrl:
      'https://i.pinimg.com/originals/ff/a0/bd/ffa0bde20582aedb16cc9638b60eba14.jpg',
    qoh: 20,
    species: 'hedgehog'
  },
  {
    name: 'harry-pot-hog',
    description: `Four loko mixtape meh jianbing hella crucifix vegan chambray cray irony. Hexagon hoodie chia tote bag mlkshk kickstarter shabby chic pinterest organic tumblr swag yuccie vexillologist blue bottle. Copper mug tote bag dreamcatcher next level photo booth neutra. Sriracha gochujang you probably haven't heard of them semiotics iPhone pok pok. Subway tile neutra tattooed hoodie.`,
    price: 59.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F0d%2F47%2F03%2F0d4703e43351c68f6895acb867be5372.jpg&f=1&nofb=1',
    qoh: 10,
    species: 'hedgehog'
  },
  {
    name: 'sweater-hog',
    description: `Single-origin coffee hashtag taiyaki vice, yuccie DIY vaporware before they sold out narwhal poke. Yuccie meditation man braid green juice tbh cliche. Gochujang iPhone chambray, affogato gluten-free meh +1 enamel pin brunch taxidermy lomo pug kinfolk yr artisan. Paleo cronut whatever williamsburg intelligentsia. Kogi selfies hammock pabst, dreamcatcher adaptogen austin kale chips jean shorts four loko vinyl deep v mumblecore. Heirloom XOXO affogato actually, post-ironic kickstarter activated charcoal hammock bespoke kale chips twee sustainable artisan pug.`,
    price: 39.99,
    imageUrl:
      'https://s-media-cache-ak0.pinimg.com/564x/45/cc/57/45cc573d687f10535a97f5a9ed192a5e.jpg',
    qoh: 15,
    species: 'hedgehog'
  },
  {
    name: 'beanie-hog',
    description: `Trust fund cardigan typewriter prism, letterpress green juice deep v cornhole food truck whatever iPhone. Pinterest hexagon letterpress typewriter affogato, prism lo-fi vape iceland man bun fanny pack forage tbh freegan tacos. Intelligentsia kombucha vegan bicycle rights, skateboard direct trade food truck pabst twee chillwave kale chips affogato occupy. Unicorn tumblr intelligentsia crucifix mixtape, PBR&B etsy typewriter sriracha cornhole single-origin coffee austin bushwick. Copper mug waistcoat twee poutine woke plaid paleo fam, vape swag bespoke cliche tbh next level.`,
    price: 29.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fexternal-preview.redd.it%2F6MV9E0cRXrEnMV2k8tUBgMWK6P6YGBE2Vgn-fRVAQS4.jpg%3Fauto%3Dwebp%26s%3Dc4961ed477c9a7d7c207c58f768bbf6de026a736&f=1&nofb=1',
    qoh: 10,
    species: 'hedgehog'
  },
  {
    name: 'hedgy-raincoat',
    description:
      'Vim habeo nostro iuvaret ut, sed ne partem quaeque, quod intellegat reformidans cum an. Sed solet cetero graecis at, corrumpit argumentum ne vim. Sit ex nibh sententiae, nam te dolorum fierent vituperata, audiam veritus philosophia pri ex. Cu fabulas voluptaria ius, eu nam enim tota.',
    price: 8.99,
    imageUrl:
      'https://i.pinimg.com/474x/9d/7d/c7/9d7dc74a47d562ce3ff819419bb4f208--raincoat-hedgehogs.jpg',
    qoh: 88,
    species: 'hedgehog'
  },
  {
    name: 'hedgy-hat',
    description:
      'Et quidam graeco pro, vix ex repudiare expetendis. Cu mentitum suscipit iudicabit eam, ei cum decore iudicabit reformidans. Qui expetenda expetendis ut.',
    price: 3.45,
    imageUrl:
      'https://i.pinimg.com/originals/32/70/5d/32705dc6753be644f4bdc831d659c7ce.jpg',
    qoh: 55,
    species: 'hedgehog'
  },
  {
    name: 'bumble-hog',
    description:
      'Ut eum utroque postulant, eu legimus lucilius sea, munere postea ocurreret ad nam. Ceteros tractatos ei mel, cu antiopam inimicus evertitur pri, sale salutatus voluptatum id nam.',
    price: 18.9,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51JOjHNMNPL._AC_SY450_.jpg',
    qoh: 43,
    species: 'hedgehog'
  },
  {
    name: 'hedgehog-socks',
    description:
      'Bonorum detracto mei et, mei justo ornatus ancillae ex, cu eam nihil perfecto hendrerit. At solum omnes salutatus nam. Et quidam graeco pro, vix ex repudiare expetendis. Cu mentitum suscipit iudicabit eam, ei cum decore iudicabit reformidans. ',
    price: 0,
    imageUrl: 'https://i.redd.it/503deuckunl01.jpg',
    qoh: 12,
    species: 'hedgehog'
  },
  {
    name: 'hedge-tux',
    description:
      'Sit ex nibh sententiae, nam te dolorum fierent vituperata, audiam veritus philosophia pri ex. Cu fabulas voluptaria ius, eu nam enim tota. Eum ignota timeam senserit id, duo eu noster commodo diceret, at meis munere ornatus pri.',
    price: 37.23,
    imageUrl:
      'https://i.pinimg.com/originals/2c/93/d7/2c93d763d2efe2a04bb50ce6cab71945.jpg',
    qoh: 4,
    species: 'hedgehog'
  },
  {
    name: 'hedge-shark',
    description: `Paleo mumblecore gluten-free pok pok wolf viral XOXO farm-to-table twee everyday carry brunch subway tile ramps food truck forage. Brunch man bun freegan venmo, taiyaki kombucha typewriter hammock. Kogi cold-pressed affogato farm-to-table, enamel pin bespoke hashtag franzen before they sold out intelligentsia succulents hot chicken. Brooklyn vape enamel pin beard blue bottle cronut. Cliche helvetica squid fingerstache church-key, freegan brooklyn shaman pinterest. Fixie gentrify gochujang irony vegan, whatever distillery leggings truffaut you probably haven't heard of them edison bulb franzen tumblr lomo.`,
    price: 16.88,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/610vVO93AbL._AC_SL1000_.jpg',
    qoh: 5,
    species: 'hedgehog'
  },
  {
    name: 'hedgehog-glasses',
    description: `palo santo plaid listicle, street art hoodie pug vinyl yr biodiesel vape artisan fanny pack pitchfork seitan. gastropub gentrify squid af, biodiesel small batch blog hot chicken. stumptown biodiesel vinyl, raw denim gastropub tilde kickstarter fingerstache yr air plant. iphone sriracha chillwave, twee mlkshk yr next level vaporware thundercats actually viral. lyft mustache adaptogen, plaid kale chips sartorial 8-bit. gochujang trust fund normcore chillwave bitters. roof party vice green juice vexillologist, af copper mug tousled portland yolo kitsch kale chips gastropub +1 mlkshk.`,
    price: 5.99,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71IpAL8t1iL._AC_SL1001_.jpg',
    qoh: 6,
    species: 'hedgehog'
  },
  {
    name: 'hedgehog-sweater',
    description: `Woke schlitz chia edison bulb letterpress affogato etsy swag tbh. Pitchfork edison bulb offal tacos helvetica bushwick, kogi farm-to-table kickstarter. Subway tile freegan coloring book organic fam. Neutra synth literally taxidermy, cray mixtape ennui waistcoat ugh master cleanse cronut. Stumptown mumblecore heirloom, chicharrones cloud bread knausgaard normcore sriracha chia hella crucifix letterpress.`,
    price: 14.23,
    imageUrl: 'https://i.redd.it/ydoe9el0k5n41.jpg',
    qoh: 7,
    species: 'hedgehog'
  },
  {
    name: 'hedge-tutu',
    description: `Normcore tousled deep v 90's palo santo, wayfarers DIY bicycle rights. Seitan cardigan enamel pin, pug 3 wolf moon gochujang PBR&B bushwick +1 hashtag iPhone fixie quinoa woke. Sartorial small batch four loko craft beer tumeric. Stumptown keffiyeh meggings cardigan next level, helvetica authentic polaroid glossier YOLO occupy yr cliche direct trade. Chambray affogato shoreditch, letterpress fashion axe yuccie succulents pok pok banjo viral offal everyday carry pitchfork slow-carb. PBR&B everyday carry aesthetic, kombucha edison bulb brunch portland flexitarian etsy`,
    price: 16.78,
    imageUrl:
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2018%2F01%2Fpet-outfit-1.jpg&q=85',
    qoh: 6,
    species: 'hedgehog'
  },
  {
    name: 'hedge-pig',
    description: `Kombucha art party copper mug, glossier brooklyn green juice everyday carry bitters blue bottle hexagon ennui etsy subway tile chartreuse. Activated charcoal keffiyeh craft beer authentic man braid copper mug actually meditation. Retro live-edge iceland fam adaptogen street art man braid palo santo affogato kale chips authentic typewriter messenger bag. Squid disrupt drinking vinegar iPhone man braid mumblecore. Green juice chillwave YOLO, +1 vaporware etsy street art lumbersexual listicle seitan banh mi woke kickstarter freegan brooklyn. Iceland enamel pin cloud bread pug.`,
    price: 14.99,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51N%2Bxy9bjDL._AC_SL1000_.jpg',
    qoh: 3,
    species: 'hedgehog'
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    name: 'turkey-turtle',
    description: `palo santo plaid listicle, street art hoodie pug vinyl yr biodiesel vape artisan fanny pack pitchfork seitan. gastropub gentrify squid af, biodiesel small batch blog hot chicken. stumptown biodiesel vinyl, raw denim gastropub tilde kickstarter fingerstache yr air plant. iphone sriracha chillwave, twee mlkshk yr next level vaporware thundercats actually viral. lyft mustache adaptogen, plaid kale chips sartorial 8-bit. gochujang trust fund normcore chillwave bitters. roof party vice green juice vexillologist, af copper mug tousled portland yolo kitsch kale chips gastropub +1 mlkshk.`,
    price: 29.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.eHhTQy43ouUkf6yuY9GveQHaFj%26pid%3DApi&f=1',
    qoh: 15,
    species: 'reptile'
  },
  {
    name: 'turtle-tree',
    description: `Paleo mumblecore gluten-free pok pok wolf viral XOXO farm-to-table twee everyday carry brunch subway tile ramps food truck forage. Brunch man bun freegan venmo, taiyaki kombucha typewriter hammock. Kogi cold-pressed affogato farm-to-table, enamel pin bespoke hashtag franzen before they sold out intelligentsia succulents hot chicken. Brooklyn vape enamel pin beard blue bottle cronut. Cliche helvetica squid fingerstache church-key, freegan brooklyn shaman pinterest. Fixie gentrify gochujang irony vegan, whatever distillery leggings truffaut you probably haven't heard of them edison bulb franzen tumblr lomo.`,
    price: 29.99,
    imageUrl:
      'http://uploads.neatorama.com/images/posts/457/70/70457/1395441984-1.jpg',
    qoh: 5,
    species: 'reptile'
  },
  {
    name: 'turtle-shark',
    description: `Woke schlitz chia edison bulb letterpress affogato etsy swag tbh. Pitchfork edison bulb offal tacos helvetica bushwick, kogi farm-to-table kickstarter. Subway tile freegan coloring book organic fam. Neutra synth literally taxidermy, cray mixtape ennui waistcoat ugh master cleanse cronut. Stumptown mumblecore heirloom, chicharrones cloud bread knausgaard normcore sriracha chia hella crucifix letterpress.`,
    price: 39.99,
    imageUrl:
      'https://img1.etsystatic.com/012/1/7507736/il_570xN.454663495_dygp.jpg',
    qoh: 10,
    species: 'reptile'
  },
  {
    name: 'turtle-yoda',
    description: `Normcore tousled deep v 90's palo santo, wayfarers DIY bicycle rights. Seitan cardigan enamel pin, pug 3 wolf moon gochujang PBR&B bushwick +1 hashtag iPhone fixie quinoa woke. Sartorial small batch four loko craft beer tumeric. Stumptown keffiyeh meggings cardigan next level, helvetica authentic polaroid glossier YOLO occupy yr cliche direct trade. Chambray affogato shoreditch, letterpress fashion axe yuccie succulents pok pok banjo viral offal everyday carry pitchfork slow-carb. PBR&B everyday carry aesthetic, kombucha edison bulb brunch portland flexitarian etsy`,
    price: 49.99,
    imageUrl:
      'https://i.etsystatic.com/14574419/r/il/e3955e/1137803150/il_fullxfull.1137803150_3du1.jpg',
    qoh: 10,
    species: 'reptile'
  },
  {
    name: 'turtle-bunny',
    description: `Kombucha art party copper mug, glossier brooklyn green juice everyday carry bitters blue bottle hexagon ennui etsy subway tile chartreuse. Activated charcoal keffiyeh craft beer authentic man braid copper mug actually meditation. Retro live-edge iceland fam adaptogen street art man braid palo santo affogato kale chips authentic typewriter messenger bag. Squid disrupt drinking vinegar iPhone man braid mumblecore. Green juice chillwave YOLO, +1 vaporware etsy street art lumbersexual listicle seitan banh mi woke kickstarter freegan brooklyn. Iceland enamel pin cloud bread pug.`,
    price: 29.99,
    imageUrl:
      'http://inotternews.com/wp-content/uploads/2013/10/DSC_2317-Copy.jpg',
    qoh: 20,
    species: 'reptile'
  },
  {
    name: 'turtle-candle',
    description: `Etsy bicycle rights actually, hella post-ironic raclette portland. Fam lo-fi messenger bag cred umami. Humblebrag before they sold out jianbing, food truck tofu migas tbh helvetica viral salvia keytar. Kogi forage vexillologist bicycle rights unicorn, stumptown ennui.`,
    price: 59.99,
    imageUrl:
      'https://static.boredpanda.com/blog/wp-content/org_uploads/2014/05/cute-crochet-tortoise-cozy-katie-bradley-12__700.jpg',
    qoh: 10,
    species: 'reptile'
  },
  {
    name: 'ssstylish-hat',
    description:
      'quod intellegat reformidans cum an. Sed solet cetero graecis at, corrumpit argumentum ne vim. Sit ex nibh sententiae, nam te dolorum fierent vituperata, audiam veritus philosophia pri ex',
    price: 7.98,
    imageUrl:
      'https://www.thesun.co.uk/wp-content/uploads/2019/08/NINTCHDBPICT000516641595-e1567035622726.jpg',
    qoh: 42,
    species: 'reptile'
  },
  {
    name: 'viking-snake',
    description:
      'Platonem repudiare his no, nulla tempor graecis ne vis. Impetus debitis posidonium duo ne, partiendo neglegentur usu in, ut esse quaerendum cum. Ullum senserit an mei, nam idque laoreet id. ',
    price: 11.0,
    imageUrl:
      'https://i.pinimg.com/originals/72/cd/13/72cd1337c035cf95e9151a6b76397965.jpg',
    qoh: 89,
    species: 'reptile'
  },
  {
    name: 'party-snake',
    description:
      'Eu qui accumsan gubergren adipiscing, at movet dolores mediocritatem eam, mei timeam mediocrem ne. Sed erant nominavi honestatis eu. Mei natum gloriatur temporibus id, vel an invenire consulatu, nam in saepe malorum eloquentiam.',
    price: 2.66,
    imageUrl:
      'https://metro.co.uk/wp-content/uploads/2015/11/party-snake.jpg?quality=90&strip=all&w=1200&h=630&crop=1',
    qoh: 1,
    species: 'reptile'
  },
  {
    name: 'santa-snake',
    description:
      'Movet soluta meliore eos ut. Ei graeco aperiri constituam sed, id sea cibo ponderum accommodare. At dicat petentium cum. Ut tacimates deseruisse has. Ius ea noluisse prodesset. His choro tantas incorrupte at.',
    price: 15.1,
    imageUrl:
      'https://ball-pythons.net/forums/cache2.php?img=https://images.tapatalk-cdn.com/15/04/18/3e3275637baf7a67bedd62a85170ab9a.jpg',
    qoh: 122,
    species: 'reptile'
  },
  {
    name: 'sweater-snake',
    description:
      'Qui ignota dicunt in, eam ei nonumy commune scriptorem. Te vel novum latine. Ne munere aperiam ius, pro soluta aliquam sadipscing ut, vix nullam soluta te. Has et brute veritus molestie. Urbanitas liberavisse vix et.',
    price: 14.2,
    imageUrl:
      'https://64.media.tumblr.com/0cbbf1a898ab8b666b3e48ad930bbe4e/tumblr_mxuzcr51Vd1rbiizto1_1280.jpg',
    qoh: 96,
    species: 'reptile'
  },
  {
    name: 'lizard-backpack',
    description: `Hoodie photo booth seitan, succulents meditation pour-over portland actually wayfarers crucifix taxidermy. Literally bicycle rights plaid, lo-fi typewriter brunch small batch migas authentic shaman snackwave forage. Squid shaman austin scenester slow-carb green juice thundercats unicorn actually taiyaki mustache hexagon poke af iPhone. Tumeric organic flannel jianbing wolf.`,
    price: 9.98,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61G-04pn50L._AC_SL1001_.jpg',
    qoh: 70,
    species: 'reptile'
  },
  {
    name: 'dragon-bow',
    description:
      'quod intellegat reformidans cum an. Sed solet cetero graecis at, corrumpit argumentum ne vim. Sit ex nibh sententiae, nam te dolorum fierent vituperata, audiam veritus philosophia pri ex',
    price: 5.96,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51eGV4guQnL._AC_SL1000_.jpg',
    qoh: 53,
    species: 'reptile'
  },
  {
    name: 'iguana-crown',
    description:
      'Platonem repudiare his no, nulla tempor graecis ne vis. Impetus debitis posidonium duo ne, partiendo neglegentur usu in, ut esse quaerendum cum. Ullum senserit an mei, nam idque laoreet id. ',
    price: 7.56,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61f0yVrq5cL._AC_SL1001_.jpg',
    qoh: 23,
    species: 'reptile'
  },
  {
    name: 'lizard-hoodie',
    description: `Etsy bicycle rights actually, hella post-ironic raclette portland. Fam lo-fi messenger bag cred umami. Humblebrag before they sold out jianbing, food truck tofu migas tbh helvetica viral salvia keytar. Kogi forage vexillologist bicycle rights unicorn, stumptown ennui.`,
    price: 12.74,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61GCPgjW1JL._AC_SL1200_.jpg',
    qoh: 15,
    species: 'reptile'
  },
  {
    name: 'lizard-witch-bat',
    description:
      'Qui ignota dicunt in, eam ei nonumy commune scriptorem. Te vel novum latine. Ne munere aperiam ius, pro soluta aliquam sadipscing ut, vix nullam soluta te. Has et brute veritus molestie. Urbanitas liberavisse vix et.',
    price: 10.74,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71c8HBzjoWL._AC_SL1500_.jpg',
    qoh: 10,
    species: 'reptile'
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    name: 'ferret-pumpkin',
    description: `Hoodie photo booth seitan, succulents meditation pour-over portland actually wayfarers crucifix taxidermy. Literally bicycle rights plaid, lo-fi typewriter brunch small batch migas authentic shaman snackwave forage. Squid shaman austin scenester slow-carb green juice thundercats unicorn actually taiyaki mustache hexagon poke af iPhone. Tumeric organic flannel jianbing wolf.`,
    price: 29.99,
    imageUrl: 'https://i.ytimg.com/vi/gRolQBKYZxo/hqdefault.jpg',
    qoh: 10,
    species: 'ferret'
  },
  {
    name: 'ferret-aviator',
    description: `Salvia biodiesel truffaut franzen. Copper mug authentic la croix fam gluten-free tacos man bun pour-over blue bottle raw denim subway tile tofu whatever hot chicken. Activated charcoal chia copper mug, meditation chicharrones sustainable leggings art party man braid cold-pressed. Slow-carb yuccie man braid, cardigan etsy schlitz leggings ennui chambray organic disrupt put a bird on it meditation. Brooklyn shabby chic raclette wayfarers. Heirloom synth salvia retro dreamcatcher aesthetic.`,
    price: 69.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia-cache-ak0.pinimg.com%2F236x%2Fa9%2F63%2Ff8%2Fa963f8d2eaf19d535c7e051f805c1d9d.jpg&f=1&nofb=1',
    qoh: 10,
    species: 'ferret'
  },
  {
    name: 'snow-ferret',
    description: `PBR&B umami pour-over paleo cronut keffiyeh. Chicharrones edison bulb ugh street art. 8-bit chicharrones tilde poke squid, pinterest tousled. Tumeric swag squid, plaid photo booth af tofu.`,
    price: 49.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themodernferret.com%2Fwp-content%2Fuploads%2F2019%2F10%2F2019-Ferret-Halloween-Lumberjack-e1572021909365-1024x782.png&f=1&nofb=1',
    qoh: 20,
    species: 'ferret'
  },
  {
    name: 'le-ferret',
    description: `Distillery listicle skateboard bicycle rights activated charcoal messenger bag readymade succulents single-origin coffee venmo. Skateboard tousled pickled, XOXO flexitarian hashtag plaid meh kitsch brooklyn squid venmo literally jean shorts. Biodiesel narwhal cold-pressed sustainable mumblecore fashion axe truffaut etsy salvia hoodie. Franzen stumptown kale chips, jean shorts actually put a bird on it gentrify lomo. Shabby chic polaroid selvage PBR&B everyday carry single-origin coffee. Pabst tofu aesthetic cold-pressed hexagon selvage. Meggings cliche wayfarers franzen roof party palo santo yr mixtape fam beard.`,
    price: 39.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ebayimg.com%2Fimages%2Fg%2FvBMAAOSwgaVe-Zpy%2Fs-l640.jpg&f=1&nofb=1',
    qoh: 10,
    species: 'ferret'
  },
  {
    name: 'donut-ferret',
    description: `Vice flexitarian fanny pack, DIY farm-to-table af dreamcatcher tilde pabst wayfarers chicharrones banjo shabby chic polaroid. Pabst squid crucifix, chicharrones waistcoat hella organic you probably haven't heard of them tacos vape intelligentsia locavore keytar knausgaard. Tote bag fingerstache yuccie hella meditation, pinterest la croix thundercats mumblecore artisan. Leggings helvetica cold-pressed mixtape brooklyn ethical, iPhone organic vegan stumptown enamel pin bicycle rights. Microdosing asymmetrical XOXO poutine before they sold out chambray fingerstache hella brooklyn tumeric. Health goth single-origin coffee mlkshk vape put a bird on it. Dreamcatcher next level la croix, cliche meggings lyft butcher.`,
    price: 29.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F23%2F56%2F29%2F23562962c470c38da8382ba87e204a41--animals-in-costumes-pet-costumes.jpg&f=1&nofb=1',
    qoh: 15,
    species: 'ferret'
  },
  {
    name: 'jester-ferret',
    description:
      'In veritus delicata intellegebat est. Autem clita fuisset in mel, has ut illud saepe interesset. An per choro persius, in ius malis dicant, et graeci adipisci evertitur sea. Nam ut malis aliquid, sit te clita equidem philosophia.',
    price: 6.96,
    imageUrl:
      'https://s7d5.scene7.com/is/image/PetsUnited/T651160?wid=328&hei=328',
    qoh: 83,
    species: 'ferret'
  },
  {
    name: 'frenchie-ferret',
    description:
      'Vix nusquam moderatius cu, eos ei fabulas dignissim. Vis quas quaestio id, in audire maluisset duo, nec an eirmod nostrud constituto. Ferri disputationi concludaturque ius ei, agam viris maiorum cum an. Te mei idque fierent, ex modo impedit nostrum has. Qui ad nulla philosophia.',
    price: 5.25,
    imageUrl: 'https://i.redd.it/e1irn17a0w821.jpg',
    qoh: 44,
    species: 'ferret'
  },
  {
    name: 'fourth-of-july-ferret',
    description:
      'Ius id prima tibique voluptua, ne vivendo elaboraret his. Eum ut ridens quaestio. Wisi iisque sit ut, ius cetero equidem accusamus an. Nec esse movet menandri cu, ex quo debet offendit consulatu, nam cu equidem accusamus.',
    price: 12.7,
    imageUrl:
      'https://s7d5.scene7.com/is/image/PetsUnited/T650838?wid=328&hei=328',
    qoh: 10,
    species: 'ferret'
  },
  {
    name: 'sweater-ferret',
    description:
      'Facer malorum noluisse eam ei, dicta elaboraret eos id. Eos no zril verear hendrerit. Nec mnesarchum necessitatibus ei, mei ei mutat senserit consectetuer. Sit agam fierent at, cum singulis pericula id.',
    price: 36.99,
    imageUrl:
      'https://www.pikpng.com/pngl/m/153-1531264_free-png-images-cute-ferrets-in-clothes-clipart.png',
    qoh: 31,
    species: 'ferret'
  },
  {
    name: 'ferret-hoodie',
    description:
      'Elit ludus praesent ad sit, eum eu abhorreant appellantur, ad quo suas congue intellegat. Ex has populo fabulas adipisci, ad postea aeterno delicatissimi per, ex quidam lobortis nec. Ius aperiam facilisi ut, elit oportere eu has. Ius no propriae sapientem. Mei legere utamur ut.',
    price: 23.47,
    imageUrl:
      'https://allpetnews.com/wp-content/uploads/2011/08/Ferret-Clothes.jpg',
    qoh: 67,
    species: 'ferret'
  },
  {
    name: 'ferret-bear',
    description:
      'Ius id prima tibique voluptua, ne vivendo elaboraret his. Eum ut ridens quaestio. Wisi iisque sit ut, ius cetero equidem accusamus an. Nec esse movet menandri cu, ex quo debet offendit consulatu, nam cu equidem accusamus.',
    price: 7.43,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61mtVEQx4RL._AC_SL1000_.jpg',
    qoh: 14,
    species: 'ferret'
  },
  {
    name: 'ferret-cop',
    description:
      'Qui ignota dicunt in, eam ei nonumy commune scriptorem. Te vel novum latine. Ne munere aperiam ius, pro soluta aliquam sadipscing ut, vix nullam soluta te. Has et brute veritus molestie. Urbanitas liberavisse vix et.',
    price: 17.34,
    imageUrl:
      'https://thumbs.dreamstime.com/b/ferret-portrait-studio-police-style-hat-handcuffs-ferret-portrait-studio-little-sofa-police-style-112155038.jpg',
    qoh: 8,
    species: 'ferret'
  },
  {
    name: 'ferret-red-hoodie',
    description:
      'Ius id prima tibique voluptua, ne vivendo elaboraret his. Eum ut ridens quaestio. Wisi iisque sit ut, ius cetero equidem accusamus an. Nec esse movet menandri cu, ex quo debet offendit consulatu, nam cu equidem accusamus.',
    price: 12.35,
    imageUrl:
      'https://en.bcdn.biz/Images/2019/11/20/3188376e-2db9-4663-a4e8-8b70c5f5866b.jpg',
    qoh: 14,
    species: 'ferret'
  },
  {
    name: 'ferret-sailor',
    description:
      'Elit ludus praesent ad sit, eum eu abhorreant appellantur, ad quo suas congue intellegat. Ex has populo fabulas adipisci, ad postea aeterno delicatissimi per, ex quidam lobortis nec. Ius aperiam facilisi ut, elit oportere eu has. Ius no propriae sapientem. Mei legere utamur ut.',
    price: 14.45,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0248/4522/1987/files/ferret_costumes_5.jpg?247',
    qoh: 65,
    species: 'ferret'
  },
  {
    name: 'ferret-plaid-dress',
    description:
      'Ius id prima tibique voluptua, ne vivendo elaboraret his. Eum ut ridens quaestio. Wisi iisque sit ut, ius cetero equidem accusamus an. Nec esse movet menandri cu, ex quo debet offendit consulatu, nam cu equidem accusamus.',
    price: 12.99,
    imageUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.trbimg.com%2Fimg-59824141%2Fturbine%2Fla-1501708606-v1v8yvedt0-snap-image&f=1&nofb=1',
    qoh: 22,
    species: 'ferret'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(
      seedUsers.map(user => {
        return User.create(user)
      })
    )
    await Promise.all(
      seedProducts.map(product => {
        return Product.create(product)
      })
    )
    console.log('Database for Grace Shopper seeded!')
  } catch (err) {
    console.log(err)
  }
}

seed()
