$.fn.extend({initPage:function(a,e,t){var g=$(this).attr("maxshowpageitem");null!=g&&g>0&&""!=g&&(page.maxshowpageitem=g);var p=$(this).attr("pagelistcount");null!=p&&p>0&&""!=p&&(page.pagelistcount=p);var i=$(this).attr("id");page.pageId=i,a<0&&(a=0),e<=0&&(e=1),page.setPageListCount(a,e,t)}});var page={pageId:"",maxshowpageitem:5,pagelistcount:10,initWithUl:function(a,e){var t=1;if(a>=0)var t=a%page.pagelistcount>0?parseInt(a/page.pagelistcount)+1:parseInt(a/page.pagelistcount);var g=page.getPageListModel(t,e);$("#"+page.pageId).html(g)},setPageListCount:function(a,e,t){a=parseInt(a),e=parseInt(e),page.initWithUl(a,e),page.initPageEvent(a,t),t(e)},initPageEvent:function(a,e){$("#"+page.pageId+">li[class='pageItem']").on("click",function(){page.setPageListCount(a,$(this).attr("page-data"),e)})},getPageListModel:function(a,e){var t=e-1,g=e+1,p="pageItem",i="pageItem";t<=0&&(p="pageItemDisable"),g>a&&(i="pageItemDisable");var s="";s+="<li class='"+p+"' page-data='1' page-rel='firstpage'>首页</li>",s+="<li class='"+p+"' page-data='"+t+"' page-rel='prepage'>&lt;上一页</li>";var n=1;e-parseInt(page.maxshowpageitem/2)>0&&e+parseInt(page.maxshowpageitem/2)<=a?n=e-parseInt(page.maxshowpageitem/2):e-parseInt(page.maxshowpageitem/2)>0&&e+parseInt(page.maxshowpageitem/2)>a&&(n=a-page.maxshowpageitem+1)<=0&&(n=1);var l=parseInt(page.maxshowpageitem);a<l&&(l=a);for(var r=0;r<l;r++){var m=n++,o="pageItem";m==e&&(o="pageItemActive"),s+="<li class='"+o+"' page-data='"+m+"' page-rel='itempage'>"+m+"</li>"}return s+="<li class='"+i+"' page-data='"+g+"' page-rel='nextpage'>下一页&gt;</li>",s+="<li class='"+i+"' page-data='"+a+"' page-rel='lastpage'>尾页</li>"}};