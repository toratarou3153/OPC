function run() {

var LP2 = (a, b, w, t1, t2) => {
  return (Math.exp((-1.7) * a * (w * t1 + (1 - w) * t2 - b))) / (1 + Math.exp((-1.7) * a * (w * t1 + (1 - w) * t2 - b)));
};

var prior_distribution_t = (x) => {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-1 * ((x**2) / 2));
};

var prior_distribution_a = (x) => {
  return (1 / ((Math.sqrt(2 * Math.PI)) * x)) * Math.exp(-1 * (((Math.log(x))**2) / 2)) ;
};

var prior_distribution_b = (x) => {
  return (1 / ((Math.sqrt(2 * Math.PI)))) * Math.exp(-1 * (((x**2) / 2)));
};

var prior_distribution_w = (x) => {
  return (1 / ((Math.sqrt(2 * Math.PI)))) * Math.exp(-1 * (((x)**2) / 2));
};

var a = [0.532554507406434,9.99994868843453,2.25750101870339,0.899452364169379,0.934178452519553,0.115012534816625,1.2236488155776,0.249196893409313,1.63607100126256,0.687052375541672,9.99992851124805,0.464011448997615,0.300315544413963,0.280130324731542,0.472430537385354,0.695427200371254,0.385580494797074,1.05234221210929,0.77617266067197,0.0757932679203832];

var b = [0.220194679295372,0.0941249617426488,0.135522623442055,0.290101818362059,0.148112891297483,-3.46340099992067,0.650171913268146,-2.81718502192477,0.773523535690727,-0.0733429095395945,0.12942249276185,1.53000989269492,3.84620426072309,3.99995395269849,3.87795912161314,0.098004414779678,3.99992688969324,0.274483289273172,-0.57864557727706,-3.99992284099457];



var w = [0.999934811326493,0.0100652034225005,0.164995599256243,0.839862694064832,0.726556309843677,0.999934811326493,0.966118156781802,0.233424965165656,0.999934811326493,0.167971317359605,0.983476189274713,0.0100652034225005,0.823076865892243,0.892171068825753,0.804729169806699,0.261317256606375,0.999934811326493,0.0117564066565974,0.0100652034225005,0.0100652034225005];

var t1 =[0.498387648061632,0.28867539734751,-0.00322336500244568,-0.883299078139518,-2.70542660490468,-0.0940749506927762,-0.0470305195843525,-0.47492255129419,-2.07191562595824,-0.0249647631945088,0.270370332076667,-0.215685215494899,-0.128905882794011,-3.979304179381,0.271705664597344,0.362903466228815,-3.979304179381,-0.0661492803707805,0.661210724084651,0.498387648061632,-0.263705072251261,0.692837455942787,-0.194781201860821,-0.419836407590787,0.359262228888007,-0.903798141174599,0.283783707473452,0.919287661608949,-0.795763486435212,0.236895629563655,-0.0373137312789832,1.36558724420106,-0.0756113170542604,0.78000933746078,-0.0256237103356332,-0.0830826812862948,-0.666427153139835,1.03375836805201,-1.53322671193294,0.505004542675329,2.04032195802831,0.337122176691189,0.727313495781252,1.13642589014847,0.0036218849024335,0.354876001381175,0.0318874362257316,0.251674823967479,0.28972262878325,0.00581055026973408,-0.872933027108711,0.719116168413848,-0.202847957410128,0.619478976635605,0.502713199524704,0.3157325502574,0.345525134455188,0.00336470660420038,0.283087375446815,0.300963563243314,0.336081484101538,0.332257878784496,-0.0322532638499776,0.785187700095001,0.254677674293435,0.459378229102126,0.0422056215154742,1.23722255605983,0.535960985927214,1];

var t2 =[-0.286731700490391,0.226902782994509,-3.31212168646811,0.311052865399745,-0.742963992880407,-0.102222345167392,0.746970505225589,0.249584247799301,-1.42878101188651,-0.202835902567807,0.322740353076665,0.747938254416032,0.673244263822146,0.351175231143099,1.57105643611613,0.600979082324486,-0.554349854638429,-1.38324076110513,0.339155548087485,-0.158301355368043,-1.3755902755707,-0.183043782797582,-0.137363634338215,0.320255773662481,0.662669263423555,0.224015368396306,0.259041880548289,-0.158515453027249,0.226523664161068,-0.296911961882464,2.43794861820322,0.606205995610876,-0.0761412844673525,-3.67688169686834,-0.047552379269452,0.307223645224439,-0.0961836620962463,0.498387648061632,-0.196687246327539,0.241307757411976,-0.587555249433514,0.205074288452278,1.19406718359994,0.385827241796245,-0.0251039820254322,-1.90597098241594,0.0157474815754841,1.28958167452888,0.850645853277469,0.549959196408796,-0.86334069413314,0.404912228708318,0.0123289833295553,-0.228497043942049,-0.728095242337428,-0.135411527290429,-0.0952885098643879,-0.106008107351319,0.284692228984997,0.464546501705267,0.301735525916094,1.46584674244689,-0.239656297681007,1.31561470144109,-0.273332194023786,0.233907799663761,-0.549891903725162,-0.261770057004638,1.01586260956313,1];

var f_theta_1 = (reactionData, t2, w, b, a) => {
  t1_list = [];
  for(var i = 0; i <= (reactionData.length - 1); i++){
    var P = (theta) => {
      let cutt = 0;
      for(var j = 0; j <= 19; j++){
        if (reactionData[i][j] ==1){
          cutt = cutt + Math.log(LP2(a[j], b[j], w[j], theta, t2[i]));
        }
        else {
          cutt = cutt + Math.log(1 - (LP2(a[j], b[j], w[j], theta, t2[i])));
        }
      };
      return (Math.exp(cutt));
    };
    let cunt_numerator = 0;
    let cunt_denominator = 0;
    for (var h =1; h <= 41; h++){
      var x = P(-4 + (h-1) * 0.2);
      cunt_numerator +=  (((-4) + (h-1) * 0.2) * x * prior_distribution_t((-4) + (h-1) * 0.2) * 0.2);
      cunt_denominator += (x * prior_distribution_t((-4) + (h-1) * 0.2) * 0.2);
    };
    t1_list.push(cunt_numerator / cunt_denominator);
  };
  var sum = 0;
  for (let i = 0; i <= reactionData.length - 1; i++) {
    sum += t1_list[i];
  };
  let mean = sum / t1_list.length;
  var varia = 0;
  for (i=0; i <=(t1_list.length - 1); i++) {
    varia = varia + (t1_list[i] - mean)**2;
  };
  let sd = Math.sqrt(varia / (t1_list.length - 1)) ;
  let list_1 = [];
  for (let k =0; k <= (t1_list.length - 1) ;k++) {
     list_1.push((t1_list[k] - mean) / sd) ;
  };
  return list_1;
};


var f_theta_2 = (reactionData, t1, w, b, a) => {
  t2_list = [];
  for(var i = 0; i <= (reactionData.length - 1); i++){
    var Q = (theta) => {
      let cutt = 0;
      for(var j = 0; j <= 19; j++){
        if (reactionData[i][j] ==1){
          cutt = cutt + Math.log(LP2(a[j], b[j], w[j], t1[i], theta));
        }
        else {
          cutt = cutt + Math.log(1 - (LP2(a[j], b[j], w[j], t1[i], theta)));
        }
      };
      return (Math.exp(cutt));
    };
    let cunt_numerator = 0;
    let cunt_denominator = 0;
    for (var h =1; h <= 41; h++){
      var x = Q(-4 + (h-1) * 0.2);
      cunt_numerator = cunt_numerator + (((-4) + (h-1) * 0.2) * x * prior_distribution_t((-4) + (h-1) * 0.2) * 0.2);
      cunt_denominator = cunt_denominator + (x * prior_distribution_t((-4) + (h-1) * 0.2) * 0.2);
    };
    t2_list.push(cunt_numerator / cunt_denominator);
  };
  var sum = 0;
  for (let i = 0; i <= (t2_list.length - 1); i++) {
    sum += t2_list[i];
  };
  let mean = sum / t2_list.length;
  var varia = 0;
  for (i=0; i <=(t2_list.length - 1); i++) {
    varia = varia + (t2_list[i] - mean)**2;
  };
  let sd = Math.sqrt(varia / (t2_list.length - 1)) ;
  let list_2 = [];
  for (let k =0; k <= t2_list.length - 1 ;k++) {
     list_2.push((t2_list[k] - mean) / sd) ;
  };
  return list_2 ;
};


var f_a_1 = (reactionData, t1, t2, w, b) => {
  a_list = [];
  for(var j = 0; j <= 19; j++){
    var S = (a) => {
      let cutt = 0;
      for(var i = 0; i <= (reactionData.length - 1); i++){
        if (reactionData[i][j] ==1){
          cutt = cutt + Math.log(LP2(a, b[j], w[j], t1[i], t2[i]));
        }
        else {
          cutt = cutt + Math.log(1 - (LP2(a, b[j], w[j], t1[i], t2[i])));
        }
      };
      return (Math.exp(cutt));
    };
    let cunt_numerator = 0;
    let cunt_denominator = 0;
    for (var h =1; h <= 41; h++){
      var x = S(-4 + (h-1) * 0.2);
      cunt_numerator = cunt_numerator + ((((h) * 0.1) * 0.1) * x * prior_distribution_a((((h) * 0.1) * 0.1)));
      cunt_denominator = cunt_denominator + (x * prior_distribution_a((((h) * 0.1) * 0.1)));
    };
    a_list.push(cunt_numerator / cunt_denominator);
  };
  var sum = 0;
  for (let i = 0; i <= (a_list.length - 1); i++) {
    sum += a_list[i];
  };
  let mean = sum / a_list.length;
  var varia = 0;
  for (i=0; i <=(a_list.length - 1); i++) {
    varia = varia + (a_list[i] - mean)**2;
  };
  let sd = Math.sqrt(varia / (a_list.length - 1)) ;
  let list_3 = [];
  for (let k =0; k <= a_list.length - 1 ;k++) {
     list_3.push((a_list[k] - mean) / sd) ;
  };
  return list_3 ;
};

var f_b_1 = (reactionData, t1, t2, w, a) => {
  b_list = [];
  for(var j = 0; j <= 19; j++){
    var T = (b) => {
      let cutt = 0;
      for(var i = 0; i <= (reactionData.length - 1); i++){
        if (reactionData[i][j] ==1){
          cutt = cutt + Math.log(LP2(a[j], b, w[j], t1[i], t2[i]));
        }
        else {
          cutt = cutt + Math.log(1 - (LP2(a[j], b, w[j], t1[i], t2[i])));
        }
      };
      return (Math.exp(cutt));
    };
    let cunt_numerator = 0;
    let cunt_denominator = 0;
    for (var h =1; h <= 41; h++){
      var x = T(-4 + (h-1) * 0.2);
      cunt_numerator = cunt_numerator + ((-4 + (h-1) * 0.2) * x * prior_distribution_b((-4 + (h-1) * 0.2)* 0.2));
      cunt_denominator = cunt_denominator + (x * prior_distribution_b((-4 + (h-1) * 0.2)* 0.2));
    };
    b_list.push(cunt_numerator / cunt_denominator);
  };
  var sum = 0;
  for (let i = 0; i <= (b_list.length - 1); i++) {
    sum += b_list[i];
  };
  let mean = sum / b_list.length;
  var varia = 0;
  for (i=0; i <=(b_list.length - 1); i++) {
    varia = varia + (b_list[i] - mean)**2;
  };
  let sd = Math.sqrt(varia / (b_list.length - 1)) ;
  let list_4 = [];
  for (let k =0; k <= b_list.length - 1 ;k++) {
     list_4.push((b_list[k] - mean) / sd) ;
  };
  return list_4 ;
};

var f_w_1 = (reactionData, t1, t2, b, a) => {
  w_list = [];
  for(var j = 0; j <= 19; j++){
    var U = (w) => {
      let cutt = 0;
      for(var i = 0; i <= (reactionData.length - 1); i++){
        if (reactionData[i][j] ==1){
          cutt = cutt + Math.log(LP2(a[j], b[j], w, t1[i], t2[i]));
        }
        else {
          cutt = cutt + Math.log(1 - (LP2(a[j], b[j], w, t1[i], t2[i])));
        }
      };
      return (Math.exp(cutt));
    };
    let cunt_numerator = 0;
    let cunt_denominator = 0;
    for (var h =1; h <= 41; h++){
      var x = U(-4 + (h-1) * 0.2);
      cunt_numerator = cunt_numerator + ((-4 + (h-1) * 0.2) * x * prior_distribution_w((-4 + (h-1) * 0.2)* 0.2));
      cunt_denominator = cunt_denominator + (x * prior_distribution_w((-4 + (h-1) * 0.2)* 0.2));
    };
    w_list.push(cunt_numerator / cunt_denominator);
  };
  var sum = 0;
  for (let i = 0; i <= (w_list.length - 1); i++) {
    sum += w_list[i];
  };
  let mean = sum / w_list.length;
  var varia = 0;
  for (i=0; i <=(w_list.length - 1); i++) {
    varia = varia + (w_list[i] - mean)**2;
  };
  let sd = Math.sqrt(varia / (w_list.length - 1)) ;
  let list_5 = [];
  for (let k =0; k <= w_list.length - 1 ;k++) {
     list_5.push((w_list[k] - mean) / sd) ;
  };
  return list_5 ;
};

  let questionbox = document.getElementById('questionbox');

  radioNodeList = questionbox.elements['like'];
  let checkValue = Number(radioNodeList.value);

  radioNodeList1 = questionbox.elements['like1'];
  let checkValue1 = Number(radioNodeList1.value);

  radioNodeList2 = questionbox.elements['like2'];
  let checkValue2 = Number(radioNodeList2.value);

  radioNodeList3 = questionbox.elements['like3'];
  let checkValue3 = Number(radioNodeList3.value);

  radioNodeList4 = questionbox.elements['like4'];
  let checkValue4 = Number(radioNodeList4.value);

  radioNodeList5 = questionbox.elements['like5'];
  let checkValue5 = Number(radioNodeList5.value);

  radioNodeList6 = questionbox.elements['like6'];
  let checkValue6 = Number(radioNodeList6.value);

  radioNodeList7 = questionbox.elements['like7'];
  let checkValue7 = Number(radioNodeList7.value);

  radioNodeList8 = questionbox.elements['like8'];
  let checkValue8 = Number(radioNodeList8.value);

  radioNodeList9 = questionbox.elements['like9'];
  let checkValue9 = Number(radioNodeList9.value);

  radioNodeList10 = questionbox.elements['like10'];
  let checkValue10 = Number(radioNodeList10.value);

  radioNodeList11 = questionbox.elements['like11'];
  let checkValue11 = Number(radioNodeList11.value);

  radioNodeList12 = questionbox.elements['like12'];
  let checkValue12 = Number(radioNodeList12.value);

  radioNodeList13 = questionbox.elements['like13'];
  let checkValue13 = Number(radioNodeList13.value);

  radioNodeList14 = questionbox.elements['like14'];
  let checkValue14 = Number(radioNodeList14.value);

  radioNodeList15 = questionbox.elements['like15'];
  let checkValue15 = Number(radioNodeList15.value);

  radioNodeList16 = questionbox.elements['like16'];
  let checkValue16 = Number(radioNodeList16.value);

  radioNodeList17 = questionbox.elements['like17'];
  let checkValue17 = Number(radioNodeList17.value);

  radioNodeList18 = questionbox.elements['like18'];
  let checkValue18 = Number(radioNodeList18.value);

  radioNodeList19 = questionbox.elements['like19'];
  let checkValue19 = Number(radioNodeList19.value);

  lists = [checkValue, checkValue1, checkValue2, checkValue3, checkValue4, checkValue5, checkValue6, checkValue7,checkValue8, checkValue9, checkValue10, checkValue11, checkValue12, checkValue13, checkValue14, checkValue15, checkValue16, checkValue17, checkValue18, checkValue19];

  let reactionData = [
    [1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,1,0],
    [0,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0],
    [1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,0,0],
    [1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,0,0],
    [1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,0,0,0,1,1,1,0,1,1,1,1,0,1,0,1,0,0],
    [1,0,0,1,1,0,1,0,1,0,0,1,1,1,1,0,1,1,0,1],
    [0,0,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,0,0],
    [1,0,0,0,0,0,1,0,1,1,1,1,0,1,1,1,0,1,0,0],
    [1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,1,1,0,1,0,0,0,0,1,1,0,1,0,0,0],
    [1,0,0,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,0,0],
    [1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,0,0],
    [0,0,0,0,1,0,0,0,1,1,0,0,1,1,1,1,1,0,1,1],
    [1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,0],
    [1,1,0,1,1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,0],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0],
    [1,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,0],
    [1,0,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,0],
    [0,0,1,1,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1],
    [1,0,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,0,0,0],
    [1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,0,0],
    [1,0,1,1,0,0,1,0,1,1,0,0,1,1,1,0,1,1,1,0],
    [0,1,1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,1,0,0,0,1,0,0,1,1,1,0,1,0,0,0],
    [0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,0,0,1],
    [0,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1],
    [0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,0,0,0],
    [1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,0,0],
    [0,1,0,1,1,0,0,1,1,0,0,0,1,1,1,0,1,0,0,1],
    [0,1,1,1,0,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0],
    [1,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,0,1],
    [1,1,1,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,0],
    [1,0,1,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,0,0,0,0,1,1,0,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,1,1,0,1],
    [0,1,0,1,0,0,0,0,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,1,1,1,1,0,1,0,1,0,0,1,0,0,1,1,0,1,1,0],
    [1,1,1,0,0,1,1,0,0,0,1,0,1,0,0,1,1,0,0,1],
    [0,0,0,1,0,0,0,0,1,0,0,1,1,0,1,1,1,0,0,1],
    [1,0,0,1,1,1,0,0,1,0,0,0,1,1,1,0,1,0,0,0],
    [0,0,0,0,1,0,1,0,1,0,1,0,0,1,1,0,1,1,0,0],
    [1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,1,1,1,0,1,0,0,1,1,1,1,0,1,0,0,1],
    [1,1,0,1,0,0,1,0,1,0,1,1,1,1,1,0,1,0,0,0],
    [0,1,0,1,1,0,0,0,1,1,0,1,1,1,1,1,0,1,0,0],
    [1,1,1,0,0,1,0,0,1,1,0,1,1,0,1,1,1,1,1,0],
    [1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,0,1,0,0,0],
    [0,1,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,0,1],
    [0,1,1,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,0,0],
    [0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,0,1,1,1,1,0,0,0,1,1,1,0,1,0,1,0],
    [0,0,0,0,0,0,1,0,1,0,0,0,1,1,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,1,0,0,0],
    [1,1,1,1,0,0,1,1,1,1,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,0,0,0,1,0,1,0,0,1,1,1,1,1,1,1,0,0],
    [0,1,1,0,1,0,0,0,1,0,1,1,0,1,1,1,1,0,1,1],
    [0,1,0,0,0,0,0,1,1,1,0,1,1,1,1,0,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,0,0,1]
  ];

  reactionData.push(lists);

  for (var d = 0; d <= 100; d++){
    t1_user = f_theta_1(reactionData, t2, w, b, a);
    t2_user = f_theta_2(reactionData, t1_user, w, b, a);
    a_user = f_a_1(reactionData, t1_user, t2_user, w, b);
    b_user = f_b_1(reactionData, t1_user, t2_user, w, a_user);
    w_user = f_w_1(reactionData, t1_user, t2_user, b_user, a_user);
    var diffrence_t1 = [];
    var diffrence_t2 = [];
    var diffrence_a = [];
    var diffrence_b = [];
    var diffrence_w = [];
    for (var l = 0;l <= (reactionData.length - 1); l++){
      diffrence_t1.push(t1[l] - t1_user[l]);
      diffrence_t2.push(t2[l] - t2_user[l]);
    }
    for (var m = 0; m <= 19; m++){
      diffrence_a.push(a[m] - a_user[m]);
      diffrence_b.push(b[m] - b_user[m]);
      diffrence_w.push(w[m] - w_user[m]);
    }
    if (Math.max.apply(null, diffrence_t1) < 0.01 && Math.max.apply(null, diffrence_t2) < 0.01 && Math.max.apply(null, diffrence_a) < 0.01 && Math.max.apply(null, diffrence_b) < 0.01 && Math.max.apply(null, diffrence_w) < 0.01){
      break ;
    }
    var t1 = t1_user;
    var t2 = t2_user;
    var a = a_user;
    var b = b_user;
    var w = w_user;
  //   // console.log(i, diffrence_t1, diffrence_t2);
  }
  if (t1[reactionData.length - 1] > t2[reactionData.length - 1]){
    var result = "数理";
  }
  else{
    var result = "機械";
  }
  console.log("(t1)", t1, "(t2)", t2, "(a)", a, "(b)", b, "(w)", w, "(" + d + ")");
  document.getElementById("result").innerHTML = result;
}
