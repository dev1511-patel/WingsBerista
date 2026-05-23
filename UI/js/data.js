const MENU = [
  {id:1,name:'Classic Beef Burger',cat:'Burgers',price:8.99,image:'Images/barista-final/41.png',desc:'Juicy beef patty, lettuce, tomato, pickles',badge:'Popular',spicy:false},
  {id:2,name:'Spicy Chicken Burger', cat:'Burgers',price:9.49, image:'Images/barista-final/44.png', badge:'Hot',spicy:true},
  {id:3,name:'BBQ Smokey Burger',    cat:'Burgers',price:10.49,image:'Images/barista-final/43.png', badge:'New',spicy:false},
  {id:4,name:'Margherita Pizza',     cat:'Pizza',  price:11.99,image:'Images/barista-final/3.png', badge:'Popular',spicy:false},
  {id:5,name:'Pepperoni Blaze',      cat:'Pizza',  price:13.49,image:'Images/barista-final/16.png',desc:'Extra pepperoni, jalapeños, mozzarella', badge:'Spicy',  spicy:true},
  {id:6,name:'BBQ Chicken Pizza',    cat:'Pizza',  price:12.99,image:'Images/barista-final/5.png',desc:'Grilled chicken, BBQ drizzle, red onions', badge:'Popular',spicy:false},
  {id:7,name:'Crispy Wings x6',      cat:'Chicken',price:7.99, image:'Images/barista-final/6.png',desc:'6 crispy wings with your choice of sauce', badge:'Popular',spicy:false},
  {id:8,name:'Peri Peri Wings x6',   cat:'Chicken',price:8.99, image:'Images/barista-final/7.png',desc:'Wings marinated in fiery peri peri sauce', badge:'Hot',    spicy:true},
  {id:9,name:'Chicken Strips x4',    cat:'Chicken',price:8.49, image:'Images/barista-final/8.png',desc:'Golden fried strips with dip',  badge:null, spicy:false},
  {id:10,name:'Oreo Shake',          cat:'Shakes', price:4.99, image:'Images/barista-final/79.png',desc:'Crushed Oreos, vanilla ice cream & milk', badge:'Popular',spicy:false},
  {id:11,name:'Mango Shake',         cat:'Shakes', price:4.49, image:'Images/barista-final/100.png',desc:'Fresh mango blended with vanilla ice cream', badge:null, spicy:false},
  {id:12,name:'Berry Blast',         cat:'Shakes', price:4.79, image:'Images/barista-final/98.png',desc:'Mixed berries, yogurt & honey',  badge:'New', spicy:false},
  {id:13,name:'Loaded Fries',        cat:'Sides',  price:4.49, image:'Images/barista-final/12.png',desc:'Crispy fries with cheese sauce & chilli', badge:'Popular',spicy:false},
  {id:14,name:'Onion Rings',         cat:'Sides',  price:3.49, image:'Images/barista-final/13.png',desc:'Golden battered onion rings with dip', badge:null, spicy:false},
  {id:15,name:'Garlic Bread',        cat:'Sides',  price:2.99, image:'Images/barista-final/65.png',desc:'Toasted garlic bread with herb butter', badge:null, spicy:false},
];

const SAMPLE_ORDERS = [
  {id:'#1042',cust:'James H.',  items:'Beef Burger, Fries, Mango Shake',   total:'£18.47',type:'Delivery', status:'preparing'},
  {id:'#1041',cust:'Sarah K.',  items:'Pepperoni Blaze, Oreo Shake x2',    total:'£23.97',type:'Dine-in',  status:'ready'},
  {id:'#1040',cust:'Omar R.',   items:'Wings x6, BBQ Burger',              total:'£16.98',type:'Takeaway', status:'delivered'},
  {id:'#1039',cust:'Priya M.',  items:'Chicken Strips, Loaded Fries',      total:'£12.98',type:'Delivery', status:'pending'},
  {id:'#1038',cust:'Tom B.',    items:'BBQ Chicken Pizza, Berry Blast',    total:'£17.78',type:'Dine-in',  status:'delivered'},
];

const CATS = ['All','Burgers','Pizza','Chicken','Shakes','Sides'];
const DELIVERY_FEE = 1.99;