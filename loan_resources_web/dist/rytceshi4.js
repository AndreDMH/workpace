$(function () {
  var flag = true;
  // 鼠标进入的时候让它隐藏，离开后让它显示
  $('.ui-schedule-line').on('mouseenter', '.ui-schedule-continue-covertimes', function (e) {
    let str = '.' + $(this).attr('class')
    let list = $(str)
    for (let k = 0; k < list.length; k++) {
      $(list[k]).show()
    }
    $(this).hide()
  })

  //获取星期的点击事件

  $('.ui-schedule-day input').on('click', function (e) {
    //window.parent.PostStrDataClickShow()
    if (e.target.nodeName == 'INPUT') {
      let a = $(this).val()
      let str1 = `#ctrl-default-esui8785927-line${a} .ui-schedule-continue-covertimes `
      let checked = $(this).attr('checked')
      if (checked == 'checked') {
        $(this).removeAttr('checked')
        let oDaysList = $(`#ctrl-default-esui8785927-line${a}`)[0].children
        for (let i = 0; i < oDaysList.length; i++) {
          $(oDaysList[i]).removeClass('ui-schedule-time-selected')
        }
        $(str1).remove()
      } else {
        //进到这里说明是全选 该把当前行的所有格子设置成选择
        // //取消选中状态
        $(this).attr('checked', 'checked')
        let oDaysListUselected = $(`#ctrl-default-esui8785927-line${a}`)[0].children
        for (let i = 0; i < oDaysListUselected.length; i++) {
          $(oDaysListUselected[i]).addClass('ui-schedule-time-selected')
        }
        let sDateHtml = `<aside data-start-time="0" data-end-time="24" data-day="${a}"
                            class="ui-schedule-continue-covertimes" style="width: 600px;
                            top: 0px; left: 0px;
                             display: block;">
                            <div class="ui-schedule-covertimes-tip">
                                <strong>全天投放</strong>
                            </div>
                         </aside>`
        $(`#ctrl-default-esui8785927-line${a}`).append(sDateHtml)
      }
      filterIsSelected(a)
    } else {
      e.stopPropagation()
      e.preventDefault()
    }
  })
  $('.ui-schedule-time-selected').on('mouseenter', function (e) {
    $('.rytdiv_td').show()
    var num = $(this).data("time")
    let nDay = $(this).data('day') + 1
    let ntop = nDay * 25 + 'px'
    let nleft = e.target.offsetLeft + e.target.offsetWidth + 13 + 'px'
    $('.rytdiv_td').css({ top: ntop, left: nleft })
    var srtnum = num + 1
    var str = `${num}:00--${srtnum}:00`
    $('.ryt_td_p').text(str)
  }).on('mouseleave', function (e) {
    $('.rytdiv_td').hide()
  })
  $('.ui-schedule-time').on('click', function (e) {
    if (e.target.classList[1] == 'ui-schedule-time-selected') {
      $(this).removeClass('ui-schedule-time-selected')
    } else {
      $(this).addClass('ui-schedule-time-selected')
    }
    let nCruutWeek = $(this).data('day')
    filterIsSelected(nCruutWeek)
    filterWeekDay()
    //window.parent.PostStrDataClickShow()
  })
  function afterFilterIsSelected(sWeek) {
    let nWeeks = $(`#ctrl-default-esui8785927-line${sWeek} .ui-schedule-time`)
    let aNewWees = []
    let UnNewWeeks = []
    for (let i = 0; i < nWeeks.length; i++) {
      if (nWeeks[i].className.indexOf("ui-schedule-time-selected") != -1) {
        aNewWees.push(nWeeks[i])
      } else {
        UnNewWeeks.push($(nWeeks[i]).data('time'))
      }
    }
    if (aNewWees.length < 24) {
      $(`#ctrl-default-esui8785927-line${sWeek} .ui-schedule-continue-covertimes `).remove()
      if (UnNewWeeks.length > 1) {
        $(`#ctrl-default-esui8785927-line${sWeek} aside`).remove()
        if (UnNewWeeks[0] >= 3) {
          let sDateHtml = `<aside data-start-time="0" data-end-time="${UnNewWeeks[0]}" data-day="${sWeek}"
            class="ui-schedule-continue-covertimes" style="width: ${UnNewWeeks[0] * 25}px;
            top: 0px; left: 0px; display: block;">
            <div class="ui-schedule-covertimes-tip">
            <strong>0.00-${UnNewWeeks[0]}.00</strong>
            </div>
            </aside>`
          $(`#ctrl-default-esui8785927-line${sWeek}`).append(sDateHtml)
        }
        let lastLength = 24;
        for (let i = 0; i < UnNewWeeks.length; i++) {
          lastLength = UnNewWeeks[i]
          if (UnNewWeeks[i + 1] - UnNewWeeks[i] >= 4) {
            let str = `<aside data-start-time="${UnNewWeeks[i]}" data-end-time="${UnNewWeeks[i + 1]}" data-day="${sWeek}"
            class="ui-schedule-continue-covertimes" style="width: ${(UnNewWeeks[i + 1] - UnNewWeeks[i] - 1) * 25}px;
            top: 0px; left: ${(UnNewWeeks[i] + 1) * 25}px; display: block;">
            <div class="ui-schedule-covertimes-tip">
            <strong>${UnNewWeeks[i]+1}.00-${UnNewWeeks[i + 1]}.00</strong>
            </div>
            </aside>`
            $(`#ctrl-default-esui8785927-line${sWeek}`).append(str)
          }
        }

        if (lastLength <= 20) {
          let sDateHtml = `<aside data-start-time="${lastLength}" data-end-time="24" data-day="${sWeek}"
            class="ui-schedule-continue-covertimes" style="width: ${(23 - lastLength) * 25}px;
            top: 0px; left: ${(lastLength + 1) * 25}px; display: block;">
            <div class="ui-schedule-covertimes-tip">
            <strong>${lastLength + 1}.00-24.00</strong>
            </div>
            </aside>`
          $(`#ctrl-default-esui8785927-line${sWeek}`).append(sDateHtml)
        }
      } else {
        let sDateHtml = `<aside data-start-time="0" data-end-time="${UnNewWeeks[0]}" data-day="${sWeek}"
            class="ui-schedule-continue-covertimes" style="width: ${UnNewWeeks[0] * 25}px;
            top: 0px; left: 0px; display: block;">
            <div class="ui-schedule-covertimes-tip">
            <strong>0.00-${UnNewWeeks[0]}.00</strong>
            </div>
            </aside>
            <aside data-start-time="${UnNewWeeks[0] + 1}" data-end-time="24" data-day="${sWeek}"
            class="ui-schedule-continue-covertimes" style="width: ${(23 - UnNewWeeks[0]) * 25}px;
             top: 0px; left: ${(UnNewWeeks[0] + 1) * 25}px; display: block;">
            <div class="ui-schedule-covertimes-tip">
            <strong>${UnNewWeeks[0] + 1}.00-24.00</strong>
            </div>
            </aside>`
        $(`#ctrl-default-esui8785927-line${sWeek}`).append(sDateHtml)
      }

    } else {
      $(`#ctrl-default-esui8785927-line${sWeek} aside`).remove()
      let sDateHtml = `<aside data-start-time="0" data-end-time="24" data-day="${sWeek}"
                            class="ui-schedule-continue-covertimes" style="width: 600px; top: 0px; left: 0px; display: block;">
                            <div class="ui-schedule-covertimes-tip">
                                <strong>全天投放</strong>
                            </div>
                         </aside>`
      $(`#ctrl-default-esui8785927-line${sWeek}`).append(sDateHtml)
    }
  }
  function filterIsSelected(sWeek) {
    afterFilterIsSelected(sWeek)
    let filterList = $('.ui-schedule-time')
    let valarr = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
      '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
      '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
      '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
      '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
      '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
      '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
    for (let o = 0; o < filterList.length; o++) {
      if (filterList[o].className.indexOf("ui-schedule-time-selected") == -1) {
        valarr.splice(o, '1', '0')
      }
    }
    let valarr1 = valarr.slice(0, 24)
    let valarr2 = valarr.slice(24, 48)
    let valarr3 = valarr.slice(48, 72)
    let valarr4 = valarr.slice(72, 96)
    let valarr5 = valarr.slice(96, 120)
    let valarr6 = valarr.slice(120, 144)
    let valarr7 = valarr.slice(144, 168)
    let obj = {
      '0': valarr1.join(''),
      '1': valarr2.join(''),
      '2': valarr3.join(''),
      '3': valarr4.join(''),
      '4': valarr5.join(''),
      '5': valarr6.join(''),
      '6': valarr7.join('')
    }
    let postStr = JSON.stringify(obj)
    $('#ctrl-default-esui8785927-value-input').val(postStr)
  }
  function filterWeekDay() {
    let list = $(`.ui-schedule-day input`)
    let timeList = $('.ui-schedule-time')
    let arr = []
    for (let o = 0; o < timeList.length; o++) {
      if (timeList[o].className.indexOf("ui-schedule-time-selected") == -1) {
        arr.push($(timeList[o]).data('day'))
      }
    }
    let arr2 = unique(arr)
    let allarr = [0, 1, 2, 3, 4, 5, 6]
    let unarr = []
    for (let i = 0; i < arr2.length; i++) {
      $(`#ctrl-default-esui8785927-line-state${arr2[i]}`).removeAttr('checked')
    }

    allarr.forEach(items => {
      if (arr2.indexOf(items) == -1) {
        list[items].checked = true
      }
    })
  }
  function selectAllDataList(type) {
    let timeList = $('.ui-schedule-time')
    if (type == 0) {
      for (let i = 0; i < timeList.length; i++) {
        if (timeList[i].className.indexOf("ui-schedule-time-selected") == -1) {
          $(timeList[i]).addClass('ui-schedule-time-selected')
        }
      }
      let star = {
        0: '111111111111111111111111',
        1: '111111111111111111111111',
        2: '111111111111111111111111',
        3: '111111111111111111111111',
        4: '111111111111111111111111',
        5: '111111111111111111111111',
        6: '111111111111111111111111'
      };
      $('#ctrl-default-esui8785927-value-input').val(JSON.stringify(star))
    } else if (type == 1) {
      for (let i = 0; i < timeList.length; i++) {
        if (i < 120) {
          if (timeList[i].className.indexOf("ui-schedule-time-selected") == -1) {
            $(timeList[i]).addClass('ui-schedule-time-selected')
          }
        } else {
          $(timeList[i]).removeClass('ui-schedule-time-selected')
        }
      }
      let arr = [5, 6]
      for (let j = 0; j < arr.length; j++) {
        filterIsSelected(arr[j])
      }
    } else if (type == 2) {
      for (let i = 0; i < timeList.length; i++) {
        if (i >= 120) {
          if (timeList[i].className.indexOf("ui-schedule-time-selected") == -1) {
            $(timeList[i]).addClass('ui-schedule-time-selected')
          }
        } else {
          $(timeList[i]).removeClass('ui-schedule-time-selected')
        }
      }
      let arr = [0, 1, 2, 3, 4]
      for (let j = 0; j < arr.length; j++) {
        filterIsSelected(arr[j])
      }
    }

    filterWeekDay()
  }
  $('.ui-schedule-shortcut-item').on('click', function () {
    //window.parent.PostStrDataClickShow()
    let key = $(this).data('item')
    let allarr = [0, 1, 2, 3, 4]
    switch (key) {
      case 0:
        selectAllDataList(0)
        break;
      case 1:
        selectAllDataList(1)
        break;
      case 2:
        selectAllDataList(2)
        break;
    }
  })
  window.getPostStrDataLsit = function () {
    let getStr = $('#ctrl-default-esui8785927-value-input').val()
    let newStr = JSON.parse(getStr)
    console.log("内部结构：返回的数据",getStr)
    if(typeof newStr == 'object' && newStr){
      return newStr
    }else{
      return {0: "111111111111111111111111", 1: "111111111111111111111111", 2: "111111111111111111111111", 3: "111111111111111111111111", 4: "111111111111111111111111", 5: "111111111111111111111111", 6: "111111111111111111111111"}
    }
    //return newStr
  }
  function unique(array) {
    var n = [];//一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < array.length; i++) {
      //如果当前数组的第i已经保存进了临时数组，那么跳过，
      //否则把当前项push到临时数组里面
      if (n.indexOf(array[i]) == -1) {
        n.push(array[i]);
      }
    }
    return n;
  }
  // 根据后台返回的值做展示
  let str = window.parent.PostStrDataListShow()
   console.log("进入打印",str);
  str.then(function (res) {
    //console.log(res)
    let list = res
    let newarr = []
    let newArr = []
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        if (list[i][j] == 0) {
          let _nJ = j
          switch (_nJ) {
            case 24:
              _nJ = 23
              break;
          }
          let obj = {}
          obj.i = i
          obj.j = _nJ
          newarr.push(obj)
        }
      }
    }
    newarr.forEach(item => {
      $(`#ctrl-default-esui8785927-time_${item.i}_${item.j}`).removeClass('ui-schedule-time-selected')
      afterFilterIsSelected(item.i)
    })

    filterIsSelected()
    filterWeekDay()
  
  })
  var endtimeStml = null,
    startTimeStml = null;

  document.onmousedown = function (e) {
    var selList = [];
    var fileNodes = $('.ui-schedule-time')
    startTimeStml = e.target
    var isSelect = true;
    var evt = window.event || arguments[0];
    var startX = (evt.x || evt.clientX);
    var startY = (evt.y || evt.clientY);
    var selDiv = document.createElement("div");
    selDiv.style.cssText =
      "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";
    selDiv.id = "ctrl-default-esui8785927-time_0_0";
    document.body.appendChild(selDiv);
    selDiv.style.left = startX + "px";
    selDiv.style.top = startY + "px";
    // 鼠标移动
    document.onmousemove = function (e) {
      let rytdiffx = e.pageX - startX
      if (isSelect) {

        if (selDiv.style.display == "none") {

          selDiv.style.display = "";

        }
        _x = (e.x || e.pageX);

        _y = (e.y || e.pageY);
        selDiv.style.left = Math.min(_x, startX) + "px";

        selDiv.style.top = Math.min(_y, startY) + "px";

        selDiv.style.width = Math.abs(_x - startX) + "px";

        selDiv.style.height = Math.abs(_y - startY) + "px";
      }
    }

    $('.ui-schedule-time').on('mouseover', function (e) {
      endtimeStml = e.target
    })
    // 鼠标抬起
    document.onmouseup = function (e) {
      isSelect = false;
      $('.ui-schedule-time').off('mouseover')
      //处理时间变色
      let startDay = $(startTimeStml).data('day'),
        endDay = $(startTimeStml).data('time'),
        startTime = $(endtimeStml).data('day'),
        endTime = $(endtimeStml).data('time');
      let objList = [];
      //window.parent.PostStrDataClickShow()
      if (selDiv) {
        if (startDay < startTime) {
          for (let j = startDay; j <= startTime; j++) {
            if (endDay < endTime) {
              for (let i = endDay; i <= endTime; i++) {
                objList.push($(`#ctrl-default-esui8785927-time_${j}_${i}`))
              }
            } else {
              for (let i = endTime; i <= endDay; i++) {
                objList.push($(`#ctrl-default-esui8785927-time_${j}_${i}`))
              }
            }
          }
        } else {
          for (let j = startTime; j <= startDay; j++) {
            if (endDay < endTime) {
              for (let i = endDay; i <= endTime; i++) {
                objList.push($(`#ctrl-default-esui8785927-time_${j}_${i}`))
              }
            } else {
              for (let i = endTime; i <= endDay; i++) {
                objList.push($(`#ctrl-default-esui8785927-time_${j}_${i}`))
              }
            }

          }
        }
        for (let a = 0; a < objList.length; a++) {
          if (objList[a][0].classList[1] == 'ui-schedule-time-selected') {
            $(objList[a]).removeClass('ui-schedule-time-selected')
          } else {
            $(objList[a]).addClass('ui-schedule-time-selected')
          }
        }
        document.body.removeChild(selDiv);
        let arr = [0, 1, 2, 3, 4, 5, 6]
        for (let j = 0; j < arr.length; j++) {
          filterIsSelected(arr[j])
        }
        filterWeekDay()
      }
      selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null, endtimeStml = null,
        startTimeStml = null;
    };
  }


  function clearEventBubble(evt) {

    if (evt.stopPropagation)

      evt.stopPropagation();

    else

      evt.cancelBubble = true;

    if (evt.preventDefault)

      evt.preventDefault();

    else

      evt.returnValue = false;

  }


  function showSelDiv(arr) {

    var count = 0;

    var selInfo = "";

    for (var i = 0; i < arr.length; i++) {

      if (arr[i].className.indexOf("seled") != -1) {

        count++;

        selInfo += arr[i].innerHTML + "\n";

      }

    }

    alert("总数 " + count + "里面的内容" + selInfo);

  }
})
