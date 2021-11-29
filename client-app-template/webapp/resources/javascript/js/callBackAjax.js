var wooYayIntervalId = 0;

var servicesEJBs = [
  {
    PerformanceGateCDI:
      "http://localhost:9095/cxf/ConvenienceCardWebsiteRSServiceCH/checkCardAndMsisdn/",
    PerformanceLocalStatelessEJB: "PerformanceLocalStatelessEJB",
    PerformanceRemoteStatelessEJB: "PerformanceRemoteStatelessEJB",
    PerformanceRemoteStatefulEJB: "PerformanceRemoteStatefulEJB",
    PerformanceRemoteSingletonEJB: "PerformanceRemoteSingletonEJB",
    ShoppingCartServlet: "ShoppingCartServlet",
  },
];

var responsesEJBs = [
  "#responsePerformanceCDI",
  "#responseLocalStatelessEJB",
  "#responseRemoteStatelessEJB",
  "#responseRemoteStatefulEJB",
  "#responseRemoteSingletonEJB",
  "#responseShopCartBase",
];

$(function () {
  $("#aioConceptName")
    .on("change", function () {
      //$("#debug").text($("#aioConceptName").val());
    })
    .trigger("change");
});

function wooYayClickHandler() {
  if (document.getElementById("wooYayButton").value == "Click Here To Start") {
    // Start the timer
    //document.getElementById("wooYayButton").value = "Parar Timer!";
    $("#wooYayButton").attr("value", "Stop Timer!");

    wooYayIntervalId = setInterval("wooYay()", $("#aioConceptName").val());
  } else {
    document.getElementById("setTimerIntervalMessage").innerHTML =
      "Stoped SetInterval";
    //+ $("#aioConceptName").val();

    //document.getElementById("wooYayButton").value = "Click Here To Start";
    $("#wooYayButton").attr("value", "Click Here To Start");

    clearInterval(wooYayIntervalId);
  }
}

function wooYay() {
  //if (Math.random() > .5) {
  document.getElementById("setTimerIntervalMessage").innerHTML =
    "Initiated SetInterval";
  //+ $("#aioConceptName").val();
  //} else {
  //	document.getElementById("setTimerIntervalMessage").innerHTML = "Value!";
  //}

  //setTimeout('document.getElementById("setTimerIntervalMessage").innerHTML = ""',
  //		500);

  callDirectURIs();
}

function callDirectURIs() {
  // this is how you set it up
  var synchronizer = new ajaxSynchronizer();
  synchronizer.add(foo1);
  synchronizer.add(foo2);
  synchronizer.add(foo3);
  synchronizer.add(foo4);
  synchronizer.add(foo5);
  synchronizer.add(shopCartBase);
  synchronizer.callWhenFinished(afterFunction);
}

function formToJSON() {
  return JSON.stringify({
    confirmMobilePhoneNumber: "1",
    confirmPrefix: "+22483",
    language: "XX",
    lastFourDigits: "5555",
    mobilePhoneNumber: "1",
    partnerId: "AAA5bbb5eD",
    prefix: "+1",
    serialNumber: "789548785487",
  });
}

function foo1(callback) {
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    type: "POST",
    method: "POST",
    url: servicesEJBs[0].PerformanceGateCDI, //'/echo/html/',
    dataType: "jsonp",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    data: formToJSON(),
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "cs_eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6Ik9zdmFsZG8gTWFydGluaSIsInByb2ZpbGVJZGVudGlmaWVyIjoiY3ZfMjAxMjI4MTkyODIwNzIydDhCamJzTXBYaUQ1RmxWIiwiaWQiOiIxIiwiZXhwIjoxNTgxMjg5MTk5LCJpYXQiOjE1ODEyNTM0OTgsInVzZXJuYW1lIjoib3N2YWxkby5tYXJ0aW5pQGdtYWlsLmNvbSJ9.5Lzyhr2wdXkIKMJEfFej3ZNIzfUOlo_wg1Cl0vMDjpL-lu8f-CJ-jRYQ7xPQapRJoMAwAzEe_Un8fTlj3qA0uw",
      );
    },
    headers: {
      "Access-Control-Allow-Headers": "Origin",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*", // my domain where I make the ajax request.
    },
    success: function (data) {
      //alert('foo1');
      $(responsesEJBs[0])
        .text(data)
        .css("font-weight", "Bold")
        .css("color", "red");
      callback();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("Sorry -- Error");
    },
  });
}

function foo2(callback) {
  $.ajax({
    url: servicesEJBs[1], //'/echo/html/',
    success: function (data) {
      //alert('foo2');
      $(responsesEJBs[1])
        .text(data)
        .css("font-weight", "Bold")
        .css("color", "red");
      callback();
    },
  });
}

function foo3(callback) {
  $.ajax({
    url: servicesEJBs[2], //'/echo/html/',
    success: function (data) {
      //alert('foo2');
      $(responsesEJBs[2])
        .text(data)
        .css("font-weight", "Bold")
        .css("color", "red");
      callback();
    },
  });
}

function foo4(callback) {
  $.ajax({
    url: servicesEJBs[3], //'/echo/html/',
    success: function (data) {
      //alert('foo2');
      $(responsesEJBs[3])
        .text(data)
        .css("font-weight", "Bold")
        .css("color", "red");
      callback();
    },
  });
}

function foo5(callback) {
  $.ajax({
    url: servicesEJBs[4], //'/echo/html/',
    success: function (data) {
      //alert('foo2');
      $(responsesEJBs[4])
        .text(data)
        .css("font-weight", "Bold")
        .css("color", "red");
      callback();
    },
  });
}

function shopCartBase(callback) {
  $.ajax({
    url: servicesEJBs[5], //'/echo/html/',
    success: function (data) {
      //alert('foo1');
      $(responsesEJBs[5])
        .text(data)
        .css("font-weight", "Bold")
        .css("color", "red");
      callback();
    },
  });
}

// here is my simplified solution
ajaxSynchronizer = function () {
  var funcs = [];
  var funcsCompleted = 0;
  var callback;

  this.add = function (f) {
    funcs.push(f);
  };

  this.synchronizer = function () {
    funcsCompleted++;
    if (funcsCompleted == funcs.length) {
      callback.call(this);
    }
  };

  this.callWhenFinished = function (cb) {
    callback = cb;
    for (var i = 0; i < funcs.length; i++) {
      funcs[i].call(this, this.synchronizer);
    }
  };
};

// this is the function that is called when both ajax calls are completed.
afterFunction = function () {
  //alert('All done!');
};
