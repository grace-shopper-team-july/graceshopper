const db = require('./db/db')
const {User, Species, Product, Order, OrderHistory, Category} = require('./db/models/index')

const seedSpecies = [
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
]
const seedProducts = [
    {
        name: 'pup-ceratops',
        description: 'Organic raclette distillery fam messenger bag. DIY hammock freegan, try-hard kinfolk tote bag lomo brooklyn schlitz swag palo santo XOXO taxidermy godard vaporware. Marfa skateboard unicorn mumblecore, chicharrones palo santo blue bottle man bun pabst shoreditch. Letterpress semiotics umami biodiesel normcore fashion axe irony chillwave hot chicken actually gluten-free 8-bit. Mustache DIY mixtape pitchfork VHS brunch seitan scenester schlitz tofu godard mumblecore food truck. Kitsch shabby chic authentic humblebrag. Whatever tofu crucifix, vaporware viral mlkshk etsy occupy tote bag.',
        price: 39.99,
        imageUrl: 'https://www.awesomeinventions.com/wp-content/uploads/2015/05/dog-dino.jpg',
        qoh: 30
    },
    {
        name: 'pup-achu',
        description: `Pabst intelligentsia you probably haven't heard of them, knausgaard YOLO bespoke chartreuse stumptown williamsburg live-edge portland. Squid meh tacos, migas paleo distillery chia whatever pok pok flannel. Ramps everyday carry fixie flexitarian. Tilde iceland readymade sriracha pok pok subway tile. Lomo squid beard, pok pok kombucha messenger bag butcher kogi austin brunch gochujang skateboard copper mug williamsburg bitters.`,
        price: 49.99,
        imageUrl: 'https://ideastand.com/wp-content/uploads/2017/09/dog-halloween-costumes/4-dog-halloween-costume-diy-ideas.jpg',
        qoh: 20
    },
    {
        name: 'puppy-buffett',
        description: `Neutra direct trade +1 kinfolk. Knausgaard williamsburg leggings edison bulb, waistcoat brunch neutra pabst succulents fixie lyft poutine. Flannel semiotics pok pok, pinterest salvia cold-pressed helvetica retro marfa glossier mlkshk gentrify deep v. Flannel hell of health goth YOLO crucifix. Literally XOXO schlitz letterpress green juice man bun unicorn sriracha. Salvia twee ethical air plant wayfarers roof party man bun, raclette humblebrag +1 dreamcatcher. Aesthetic stumptown coloring book PBR&B art party small batch, direct trade 90's irony.`,
        price: 29.99,
        imageUrl: 'https://img1.etsystatic.com/076/0/6915430/isla_fullxfull.15935439_rny2xj9r.jpg',
        qoh: 15
    },
    {
        name: 'puppy-potter',
        description: `Palo santo helvetica typewriter williamsburg squid, raw denim flannel shaman yr YOLO. Gentrify cred neutra wolf. Before they sold out street art glossier food truck cardigan plaid forage YOLO microdosing enamel pin VHS. Ramps godard yuccie wayfarers. Tattooed mustache church-key +1 kickstarter, woke taxidermy selvage.`,
        price: 19.99,
        imageUrl: 'https://i.pinimg.com/236x/57/8c/20/578c2098b742646476b11839c616772d.jpg',
        qoh: 15
    },
    {
        name: 'hard-working-pup',
        description: `Viral retro small batch, celiac everyday carry put a bird on it squid thundercats aesthetic green juice cray. Locavore mixtape heirloom taxidermy asymmetrical pinterest. Artisan schlitz 90's banjo intelligentsia mlkshk. Asymmetrical freegan leggings fanny pack unicorn, before they sold out YOLO everyday carry raclette authentic pickled intelligentsia iceland tofu hella. Tbh vape mumblecore affogato 8-bit thundercats 90's franzen green juice heirloom everyday carry. Occupy banjo neutra, snackwave waistcoat tumblr jianbing before they sold out ethical.`,
        price: 39.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F78.media.tumblr.com%2F610745f556248572741b336689b256b1%2Ftumblr_oxtcakdf7Q1vuhuy0o1_500.jpg&f=1&nofb=1',
        qoh: 20
    },
    {
        name: 'cowboy-pup',
        description: `Ramps echo park glossier pour-over. Cloud bread waistcoat gentrify, fashion axe austin tacos pug umami master cleanse fam scenester you probably haven't heard of them put a bird on it health goth lomo. Disrupt photo booth cardigan mumblecore, beard schlitz roof party yuccie locavore. Shabby chic chia poke, intelligentsia put a bird on it drinking vinegar godard organic 8-bit +1 fam air plant art party yr.`,
        price: 59.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FHTB13K1BNVXXXXbDXpXXq6xXFXXXr%2FFunny-Dog-Costume-Pet-Dog-Clothes-Puppy-Coats-Jackets-for-Halloween-Dressing-Up-Party-Apparel-for.jpg&f=1&nofb=1',
        qoh: 10
    },
    {
        name: 'cozy-lil-sweater',
        description: `Palo santo roof party chambray, franzen vexillologist pork belly cray air plant keffiyeh YOLO. Yuccie heirloom tousled man bun, unicorn gluten-free austin you probably haven't heard of them swag actually. Palo santo vexillologist ethical hashtag narwhal. Franzen squid echo park tumeric disrupt tattooed swag fanny pack mustache jianbing cred keytar mlkshk. Coloring book tote bag YOLO offal, +1 whatever pabst tacos normcore ennui tousled trust fund cloud bread art party chillwave. Pok pok wayfarers cred, selvage church-key pour-over hell of fixie waistcoat taxidermy. Lumbersexual taiyaki pabst blue bottle poke woke.`,
        price: 39.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdogcostumenetwork.files.wordpress.com%2F2015%2F07%2Fdachshund-clothing-1.jpg&f=1&nofb=1',
        qoh: 15
    },
    {
        name: 'pup-on-the-town',
        description: `Meditation pinterest freegan PBR&B. Leggings chia keffiyeh sartorial hashtag. Af hella tumblr subway tile beard lomo listicle mustache mumblecore organic slow-carb chartreuse enamel pin ennui raclette. Twee taxidermy occupy authentic brunch. Mlkshk mumblecore godard ennui, retro aesthetic neutra direct trade hammock subway tile brooklyn semiotics. Yuccie actually chicharrones crucifix iPhone biodiesel kogi prism, everyday carry health goth echo park lumbersexual heirloom. Jean shorts single-origin coffee YOLO vexillologist pabst knausgaard, mumblecore asymmetrical ramps kale chips chillwave taxidermy blue bottle humblebrag.`,
        price: 59.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.glamour.com%2Fphotos%2F56964c4016d0dc3747ef9b95%2Fmaster%2Fw_1600%252Cc_limit%2Ffashion-2015-08-ruby-rufus-dog-insweater-4-main.jpg&f=1&nofb=1',
        qoh: 15
    },
    {
        name: 'le-pup',
        description: `3 wolf moon tacos yr woke jianbing kale chips scenester meditation. Fam put a bird on it knausgaard quinoa etsy pug banh mi leggings venmo shabby chic gochujang thundercats bicycle rights authentic. Shoreditch street art adaptogen seitan irony pitchfork cornhole hella pop-up kombucha drinking vinegar kitsch chartreuse hell of glossier. Vexillologist synth cliche wolf venmo mumblecore subway tile shaman lumbersexual af tumeric vinyl marfa shabby chic.`,
        price: 69.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgoodtoknow.media.ipcdigital.co.uk%2F111%2F00001008a%2F5e06_orh100000w614%2Finstagram-dapper-dog.jpeg&f=1&nofb=1',
        qoh: 15
    },
    {
        name: 'snow-pup',
        description: `Actually XOXO paleo four loko bespoke pork belly occupy hell of. Vape beard locavore hot chicken bushwick succulents hammock scenester plaid asymmetrical. Neutra cardigan affogato polaroid green juice kogi XOXO unicorn. Thundercats raw denim shabby chic locavore narwhal PBR&B YOLO quinoa typewriter migas iceland tote bag tumeric cold-pressed. VHS seitan waistcoat pop-up kombucha slow-carb. Snackwave selvage stumptown, migas jianbing literally sriracha tote bag photo booth pabst distillery.`,
        price: 49.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpetsnurturing.com%2Fwp-content%2Fuploads%2F2019%2F01%2FDog-Winter-Clothes-7.jpg&f=1&nofb=1',
        qoh: 20
    },
    {
        name: 'cat-ears',
        description: `Cray man bun skateboard helvetica marfa post-ironic +1 sustainable. Small batch you probably haven't heard of them blue bottle, +1 cornhole iceland food truck. Air plant viral taiyaki sriracha pitchfork single-origin coffee cardigan pour-over williamsburg cornhole bitters brooklyn tattooed lomo sustainable. Tilde cronut roof party, truffaut craft beer knausgaard celiac sustainable crucifix pitchfork butcher pork belly raw denim. Austin mixtape cronut, yr keytar fanny pack cloud bread.`,
        price: 29.99,
        imageUrl: 'https://ae01.alicdn.com/kf/HTB1mFWabKLM8KJjSZFqq6y7.FXaz/Cute-Cat-Clothes-Easter-Rabbit-Animals-Clothing-Costume-Fleece-Warm-Cat-Clothes-Coat-Jackets-Outfit-for.jpg',
        qoh: 30
    },
    {
        name: 'pizza-kitty',
        description: `Actually crucifix narwhal roof party palo santo kombucha portland 3 wolf moon 8-bit swag artisan unicorn. Plaid blue bottle lyft next level. Blog put a bird on it marfa tattooed pickled. Mumblecore man braid occupy pok pok forage. Echo park tote bag put a bird on it, taxidermy butcher bitters irony air plant. Pinterest vaporware farm-to-table seitan hot chicken XOXO.`,
        price: 19.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg0.etsystatic.com%2F125%2F1%2F10706456%2Fil_570xN.1022817008_31jv.jpg&f=1&nofb=1',
        qoh: 10
    },
    {
        name: 'tuxedo-cat',
        description: `Salvia banjo disrupt etsy DIY tbh. Bicycle rights wolf post-ironic copper mug. Vaporware taiyaki normcore hella drinking vinegar adaptogen palo santo snackwave pug green juice edison bulb vegan church-key butcher. Portland gluten-free humblebrag hell of snackwave +1 iceland air plant mustache vape hoodie PBR&B put a bird on it crucifix ethical. Plaid post-ironic squid, VHS cardigan XOXO tumeric master cleanse next level wayfarers swag succulents tattooed ethical aesthetic. Aesthetic flexitarian freegan, jean shorts tattooed blog authentic.`,
        price: 29.99,
        imageUrl: 'https://www.outfittrends.com/wp-content/uploads/2018/03/Funny-Cat-Outfits10.jpg',
        qoh: 20
    },
    {
        name: 'mario-cat-hat',
        description: `Portland jean shorts fingerstache knausgaard, thundercats tumblr taxidermy hella sriracha whatever cornhole yuccie chia jianbing. Succulents fixie portland intelligentsia deep v brunch ethical forage, gastropub chartreuse swag vexillologist tumeric stumptown selfies. Poutine etsy man braid cred roof party slow-carb. Food truck adaptogen brooklyn air plant ethical kale chips flannel chicharrones. Put a bird on it raclette kinfolk pickled.`,
        price: 19.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.top13.net%2Fwp-content%2Fuploads%2F2016%2F10%2Fhalloween-costumes-kittens-3.jpg&f=1&nofb=1',
        qoh: 10
    },
    {
        name: 'cat-burger',
        description: `Lumbersexual fixie mumblecore glossier vice scenester food truck vaporware pabst 8-bit freegan viral mustache. Sartorial pitchfork lomo, succulents adaptogen enamel pin austin yuccie iPhone scenester ramps shabby chic photo booth. Cred jianbing biodiesel, craft beer synth fanny pack man braid lomo paleo mlkshk. Twee umami thundercats, kickstarter etsy adaptogen bespoke pour-over trust fund shabby chic photo booth lomo viral. Health goth vice whatever cornhole meggings jianbing truffaut pork belly irony brooklyn. Selvage disrupt post-ironic kinfolk bushwick chicharrones pinterest mumblecore truffaut keffiyeh hexagon.`,
        price: 29.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-oPUUI0YqsdQ%2FUpShG9uyTUI%2FAAAAAAAAFVs%2FSPEwflew-GQ%2Fs1600%2FFunny-Halloween-Costumes-for-Cats.jpg&f=1&nofb=1',
        qoh: 15
    },
    {
        name: 'lion-kitty',
        description: `Single-origin coffee knausgaard migas fashion axe venmo. Godard readymade disrupt sartorial bespoke, cold-pressed tofu mixtape hexagon letterpress four dollar toast flexitarian. Woke lomo offal, chicharrones williamsburg iPhone pickled. Copper mug woke swag, vice typewriter iPhone chambray air plant +1 letterpress.`,
        price: 19.99,
        imageUrl: 'https://imgix.bustle.com/uploads/image/2017/10/3/42baa108-aaf5-488b-a60a-aaed5a66f5e9-cat_lion_costume.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format&q=70',
        qoh: 15
    },
    {
        name: 'kitty-witch',
        description: `Single-origin coffee knausgaard migas fashion axe venmo. Godard readymade disrupt sartorial bespoke, cold-pressed tofu mixtape hexagon letterpress four dollar toast flexitarian. Woke lomo offal, chicharrones williamsburg iPhone pickled. Copper mug woke swag, vice typewriter iPhone chambray air plant +1 letterpress.`,
        price: 19.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.popsugar-assets.com%2Ffiles%2Fthumbor%2FdWnmOHAx4Wo10ahRwzxBH-3kBHg%2Ffit-in%2F1024x1024%2Ffilters%3Aformat_auto-!!-%3Astrip_icc-!!-%2F2019%2F08%2F16%2F735%2Fn%2F1922243%2Fca9f2c965d56dc3a0c2bb6.16163769_2%2Fi%2FVampire-Cape-Hat-Cat-Costume.jpg&f=1&nofb=1',
        qoh: 15
    },
    {
        name: 'le-kitty',
        description: `Butcher venmo meditation, poke trust fund helvetica squid. Asymmetrical heirloom chicharrones, bushwick migas photo booth XOXO cloud bread paleo selfies street art kickstarter cray. Selvage photo booth vaporware helvetica readymade 90's lyft knausgaard flannel. Meh cornhole man braid, blog portland ramps artisan.`,
        price: 39.99,
        imageUrl: 'https://cdn.costumewall.com/wp-content/uploads/2015/09/cute-cat-costumes-29.jpg',
        qoh: 25
    },
    {
        name: 'bad-kitty',
        description: `Gluten-free gochujang tumblr distillery twee cred. Four dollar toast woke actually yuccie raclette kinfolk flexitarian. Franzen butcher selfies flexitarian, neutra crucifix cray cronut waistcoat tattooed af VHS. Gochujang cronut iceland vinyl bespoke vape. Try-hard flannel iPhone irony beard cardigan tattooed quinoa. Hoodie occupy affogato, keytar microdosing ugh actually air plant kickstarter typewriter 8-bit yr disrupt kombucha chia. Letterpress food truck marfa meditation, aesthetic narwhal heirloom chillwave whatever typewriter crucifix schlitz cray sriracha pok pok.`,
        price: 29.99,
        imageUrl: 'http://www.wishforpets.com/wp-content/uploads/2014/12/Cat-devil-costumes8.jpg',
        qoh: 15
    },
    {
        name: 'kitty-taco',
        description: `Distillery mumblecore microdosing, mlkshk mustache lomo typewriter banjo. Master cleanse taiyaki tofu selfies raclette. Vice poke gluten-free irony hella tilde kombucha. Vinyl asymmetrical vaporware, pop-up hella mumblecore artisan cronut polaroid slow-carb sartorial banh mi.`,
        price: 49.99,
        imageUrl: 'http://www.hepper.com/wp-content/uploads/2017/10/tacocat.jpg',
        qoh: 20
    },
    {
        name: 'senor-hog',
        description: `Letterpress slow-carb tousled artisan, art party vegan bushwick palo santo cray organic taxidermy coloring book +1 authentic chillwave. Kickstarter schlitz letterpress keffiyeh. Ugh fixie disrupt brooklyn taiyaki, hashtag taxidermy tofu shoreditch post-ironic keytar try-hard. Flexitarian kogi lo-fi, heirloom jean shorts umami scenester sriracha you probably haven't heard of them.`,
        price: 39.99,
        imageUrl: 'http://uploads.neatorama.com/images/posts/997/56/56997/1357192949-0.jpg',
        qoh: 15
    },
    {
        name: 'dracula-hog',
        description: `Biodiesel snackwave drinking vinegar, DIY celiac lo-fi knausgaard. Flexitarian swag jianbing neutra squid fixie prism pabst coloring book selfies fingerstache authentic. Echo park master cleanse bicycle rights man bun edison bulb cronut, pok pok single-origin coffee try-hard pug helvetica. Hot chicken meggings pitchfork occupy dreamcatcher raw denim. Cold-pressed typewriter 3 wolf moon forage, dreamcatcher portland ennui. Shaman lumbersexual gastropub intelligentsia skateboard, venmo drinking vinegar you probably haven't heard of them bitters jianbing XOXO brunch vexillologist blog pop-up.`,
        price: 49.99,
        imageUrl: 'https://i.pinimg.com/originals/ff/a0/bd/ffa0bde20582aedb16cc9638b60eba14.jpg',
        qoh: 20
    },
    {
        name: 'harry-pot-hog',
        description: `Four loko mixtape meh jianbing hella crucifix vegan chambray cray irony. Hexagon hoodie chia tote bag mlkshk kickstarter shabby chic pinterest organic tumblr swag yuccie vexillologist blue bottle. Copper mug tote bag dreamcatcher next level photo booth neutra. Sriracha gochujang you probably haven't heard of them semiotics iPhone pok pok. Subway tile neutra tattooed hoodie.`,
        price: 59.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F0d%2F47%2F03%2F0d4703e43351c68f6895acb867be5372.jpg&f=1&nofb=1',
        qoh: 10
    },
    {
        name: 'sweater-hog',
        description: `Single-origin coffee hashtag taiyaki vice, yuccie DIY vaporware before they sold out narwhal poke. Yuccie meditation man braid green juice tbh cliche. Gochujang iPhone chambray, affogato gluten-free meh +1 enamel pin brunch taxidermy lomo pug kinfolk yr artisan. Paleo cronut whatever williamsburg intelligentsia. Kogi selfies hammock pabst, dreamcatcher adaptogen austin kale chips jean shorts four loko vinyl deep v mumblecore. Heirloom XOXO affogato actually, post-ironic kickstarter activated charcoal hammock bespoke kale chips twee sustainable artisan pug.`,
        price: 39.99,
        imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/45/cc/57/45cc573d687f10535a97f5a9ed192a5e.jpg',
        qoh: 15
    },
    {
        name: 'beanie-hog',
        description: `Trust fund cardigan typewriter prism, letterpress green juice deep v cornhole food truck whatever iPhone. Pinterest hexagon letterpress typewriter affogato, prism lo-fi vape iceland man bun fanny pack forage tbh freegan tacos. Intelligentsia kombucha vegan bicycle rights, skateboard direct trade food truck pabst twee chillwave kale chips affogato occupy. Unicorn tumblr intelligentsia crucifix mixtape, PBR&B etsy typewriter sriracha cornhole single-origin coffee austin bushwick. Copper mug waistcoat twee poutine woke plaid paleo fam, vape swag bespoke cliche tbh next level.`,
        price: 29.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fexternal-preview.redd.it%2F6MV9E0cRXrEnMV2k8tUBgMWK6P6YGBE2Vgn-fRVAQS4.jpg%3Fauto%3Dwebp%26s%3Dc4961ed477c9a7d7c207c58f768bbf6de026a736&f=1&nofb=1',
        qoh: 10
    },
    {
        name: 'turkey-turtle',
        description: `Palo santo plaid listicle, street art hoodie pug vinyl yr biodiesel vape artisan fanny pack pitchfork seitan. Gastropub gentrify squid af, biodiesel small batch blog hot chicken. Stumptown biodiesel vinyl, raw denim gastropub tilde kickstarter fingerstache yr air plant. IPhone sriracha chillwave, twee mlkshk yr next level vaporware thundercats actually viral. Lyft mustache adaptogen, plaid kale chips sartorial 8-bit. Gochujang trust fund normcore chillwave bitters. Roof party vice green juice vexillologist, af copper mug tousled portland YOLO kitsch kale chips gastropub +1 mlkshk.`,
        price: 29.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.eHhTQy43ouUkf6yuY9GveQHaFj%26pid%3DApi&f=1',
        qoh: 15
    },
    {
        name: 'turtle-tree',
        description: `Paleo mumblecore gluten-free pok pok wolf viral XOXO farm-to-table twee everyday carry brunch subway tile ramps food truck forage. Brunch man bun freegan venmo, taiyaki kombucha typewriter hammock. Kogi cold-pressed affogato farm-to-table, enamel pin bespoke hashtag franzen before they sold out intelligentsia succulents hot chicken. Brooklyn vape enamel pin beard blue bottle cronut. Cliche helvetica squid fingerstache church-key, freegan brooklyn shaman pinterest. Fixie gentrify gochujang irony vegan, whatever distillery leggings truffaut you probably haven't heard of them edison bulb franzen tumblr lomo.`,
        price: 29.99,
        imageUrl: 'http://uploads.neatorama.com/images/posts/457/70/70457/1395441984-1.jpg',
        qoh: 5
    },
    {
        name: 'turtle-shark',
        description: `Woke schlitz chia edison bulb letterpress affogato etsy swag tbh. Pitchfork edison bulb offal tacos helvetica bushwick, kogi farm-to-table kickstarter. Subway tile freegan coloring book organic fam. Neutra synth literally taxidermy, cray mixtape ennui waistcoat ugh master cleanse cronut. Stumptown mumblecore heirloom, chicharrones cloud bread knausgaard normcore sriracha chia hella crucifix letterpress.`,
        price: 39.99,
        imageUrl: 'https://img1.etsystatic.com/012/1/7507736/il_570xN.454663495_dygp.jpg',
        qoh: 10
    },
    {
        name: 'turtle-yoda',
        description: `Normcore tousled deep v 90's palo santo, wayfarers DIY bicycle rights. Seitan cardigan enamel pin, pug 3 wolf moon gochujang PBR&B bushwick +1 hashtag iPhone fixie quinoa woke. Sartorial small batch four loko craft beer tumeric. Stumptown keffiyeh meggings cardigan next level, helvetica authentic polaroid glossier YOLO occupy yr cliche direct trade. Chambray affogato shoreditch, letterpress fashion axe yuccie succulents pok pok banjo viral offal everyday carry pitchfork slow-carb. PBR&B everyday carry aesthetic, kombucha edison bulb brunch portland flexitarian etsy`,
        price: 49.99,
        imageUrl: 'https://i.etsystatic.com/14574419/r/il/e3955e/1137803150/il_fullxfull.1137803150_3du1.jpg',
        qoh: 10
    },
    {
        name: 'turtle-bunny',
        description: `Kombucha art party copper mug, glossier brooklyn green juice everyday carry bitters blue bottle hexagon ennui etsy subway tile chartreuse. Activated charcoal keffiyeh craft beer authentic man braid copper mug actually meditation. Retro live-edge iceland fam adaptogen street art man braid palo santo affogato kale chips authentic typewriter messenger bag. Squid disrupt drinking vinegar iPhone man braid mumblecore. Green juice chillwave YOLO, +1 vaporware etsy street art lumbersexual listicle seitan banh mi woke kickstarter freegan brooklyn. Iceland enamel pin cloud bread pug.`,
        price: 29.99,
        imageUrl: 'http://inotternews.com/wp-content/uploads/2013/10/DSC_2317-Copy.jpg',
        qoh: 20
    },
    {
        name: 'turtle-candle',
        description: `Etsy bicycle rights actually, hella post-ironic raclette portland. Fam lo-fi messenger bag cred umami. Humblebrag before they sold out jianbing, food truck tofu migas tbh helvetica viral salvia keytar. Kogi forage vexillologist bicycle rights unicorn, stumptown ennui.`,
        price: 59.99,
        imageUrl: 'https://static.boredpanda.com/blog/wp-content/org_uploads/2014/05/cute-crochet-tortoise-cozy-katie-bradley-12__700.jpg',
        qoh: 10
    },
    {
        name: 'ferret-pumpkin',
        description: `Hoodie photo booth seitan, succulents meditation pour-over portland actually wayfarers crucifix taxidermy. Literally bicycle rights plaid, lo-fi typewriter brunch small batch migas authentic shaman snackwave forage. Squid shaman austin scenester slow-carb green juice thundercats unicorn actually taiyaki mustache hexagon poke af iPhone. Tumeric organic flannel jianbing wolf.`,
        price: 29.99,
        imageUrl: 'https://i.ytimg.com/vi/gRolQBKYZxo/hqdefault.jpg',
        qoh: 10
    },
    {
        name: 'ferret-aviator',
        description: `Salvia biodiesel truffaut franzen. Copper mug authentic la croix fam gluten-free tacos man bun pour-over blue bottle raw denim subway tile tofu whatever hot chicken. Activated charcoal chia copper mug, meditation chicharrones sustainable leggings art party man braid cold-pressed. Slow-carb yuccie man braid, cardigan etsy schlitz leggings ennui chambray organic disrupt put a bird on it meditation. Brooklyn shabby chic raclette wayfarers. Heirloom synth salvia retro dreamcatcher aesthetic.`,
        price: 69.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia-cache-ak0.pinimg.com%2F236x%2Fa9%2F63%2Ff8%2Fa963f8d2eaf19d535c7e051f805c1d9d.jpg&f=1&nofb=1',
        qoh: 10
    },
    {
        name: 'snow-ferret',
        description: `PBR&B umami pour-over paleo cronut keffiyeh. Chicharrones edison bulb ugh street art. 8-bit chicharrones tilde poke squid, pinterest tousled. Tumeric swag squid, plaid photo booth af tofu.`,
        price: 49.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themodernferret.com%2Fwp-content%2Fuploads%2F2019%2F10%2F2019-Ferret-Halloween-Lumberjack-e1572021909365-1024x782.png&f=1&nofb=1',
        qoh: 20
    },
    {
        name: 'le-ferret',
        description: `Distillery listicle skateboard bicycle rights activated charcoal messenger bag readymade succulents single-origin coffee venmo. Skateboard tousled pickled, XOXO flexitarian hashtag plaid meh kitsch brooklyn squid venmo literally jean shorts. Biodiesel narwhal cold-pressed sustainable mumblecore fashion axe truffaut etsy salvia hoodie. Franzen stumptown kale chips, jean shorts actually put a bird on it gentrify lomo. Shabby chic polaroid selvage PBR&B everyday carry single-origin coffee. Pabst tofu aesthetic cold-pressed hexagon selvage. Meggings cliche wayfarers franzen roof party palo santo yr mixtape fam beard.`,
        price: 39.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ebayimg.com%2Fimages%2Fg%2FvBMAAOSwgaVe-Zpy%2Fs-l640.jpg&f=1&nofb=1',
        qoh: 10
    },
    {
        name: 'donut-ferret',
        description: `Vice flexitarian fanny pack, DIY farm-to-table af dreamcatcher tilde pabst wayfarers chicharrones banjo shabby chic polaroid. Pabst squid crucifix, chicharrones waistcoat hella organic you probably haven't heard of them tacos vape intelligentsia locavore keytar knausgaard. Tote bag fingerstache yuccie hella meditation, pinterest la croix thundercats mumblecore artisan. Leggings helvetica cold-pressed mixtape brooklyn ethical, iPhone organic vegan stumptown enamel pin bicycle rights. Microdosing asymmetrical XOXO poutine before they sold out chambray fingerstache hella brooklyn tumeric. Health goth single-origin coffee mlkshk vape put a bird on it. Dreamcatcher next level la croix, cliche meggings lyft butcher.`,
        price: 29.99,
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F23%2F56%2F29%2F23562962c470c38da8382ba87e204a41--animals-in-costumes-pet-costumes.jpg&f=1&nofb=1',
        qoh: 15
    },


    
]