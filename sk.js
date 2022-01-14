sessionStorage['fm']=0
$('body').prepend(
	`
		<div class='chmak marks'>
		<span class='mR' id='mk1'>1</span>
		<span class='mR' id='mk2'>2</span>
		<span class='mY' id='mk3'>3</span>
		<span class='mG' id='mk4'>4</span>
		<span class='mG' id='mk5'>5</span>
		<span class='mR' id='mk6'>-</span>
		<select id='vch'>
			<option value='0'>изменить</option>
			<option value='1'>добавить справа</option>
			<option value='2'>добавить слева</option>
		</select>
		</div>	
		<script>
	    function nmk(a){
	    	$(a).click(function(){
				$('.chmak').css('display','inline-block')
				$('.chmak').css('top',$(this).offset().top-20)
				$('.chmak').css('left',$(this).offset().left)
				localStorage['voc']=$(this).attr('data-id');
			})
	    }
		function csb(a,b){
			if (b<2.5){
				a.removeClass('mG');
				a.removeClass('mY');
				a.addClass('mR');
			}else if (b<3.5){
				a.removeClass('mG');
				a.removeClass('mR');
				a.addClass('mY');
			}else{
				a.removeClass('mR');
				a.removeClass('mY');
				a.addClass('mG');
			}
		}
		function smak(a){
			voc=localStorage['voc'];
			if (localStorage['ddat']==undefined){localStorage['ddat']='{"ch":{},"nl":{},"nr":{}}'}
			dat=JSON.parse(localStorage['ddat']);
			tm=$('.mark[data-id="'+voc+'"]');
			vo=$('#vch').val();
			if (a<3){adc='mR';}
			else if (a==3){adc='mY';}
			else{adc='mG';}
			if (vo==0){
				dat['ch'][voc]=a;
				tm.text(a);
				if (a<3){
					tm.removeClass('mG');
					tm.removeClass('mY');
					tm.addClass('mR');
				}else if (a==3){
					tm.removeClass('mG');
					tm.removeClass('mR');
					tm.addClass('mY');
				} else if (a>3){
					tm.removeClass('mR');
					tm.removeClass('mY');
					tm.addClass('mG');
				}
			}else if (vo==1){
				sessionStorage['fm']+=1;
				dat['nr'][voc]=a;
				ti='f'+sessionStorage['fm'];
				tm.after('<span class="mark '+adc+' sl " title="Ответ на уроке, 19 октября 2018, 7 урок " data-id='+ti+' data-work_id='+ti+' data-num="0">'+a+'</span>');
				tm=$('.mark[data-id="'+ti+'"]');
				nmk(tm);
			}else if (vo==2){
				sessionStorage['fm']+=1;
				dat['nl'][voc]=a;
				ti='f'+sessionStorage['fm'];
				tm.before('<span class="mark '+adc+' sl " title="Ответ на уроке, 19 октября 2018, 7 урок " data-id='+ti+' data-work_id='+ti+' data-num="0">'+a+'</span>');
				tm=$('.mark[data-id="'+ti+'"]');
				nmk(tm);
			}		
			vm=tm.parent("td")
			if (a==0){tm.remove();}
			sb=vm.parent("tr").find('td').eq(6).find('span').eq(0);
			sum=0;
			k=0;
			vm.find('span').each(function (){
				sum+=$(this).text()*1;
				k+=1;
			})
			if (k>0) {sb.text(~~(sum*100/k)/100);csb(sb,~~(sum*100/k)/100);}
			$('.chmak').hide();
			localStorage['ddat']=JSON.stringify(dat);
		}
		$('#mk1').click(function (){smak(1);})
		$('#mk2').click(function (){smak(2);})
		$('#mk3').click(function (){smak(3);})
		$('#mk4').click(function (){smak(4);})
		$('#mk5').click(function (){smak(5);})
		$('#mk6').click(function (){smak(0);})
		</script>
	`  
)
function nmk(a){
	$(a).click(function(){
		$('.chmak').css('display','inline-block')
		$('.chmak').css('top',$(this).offset().top-20)
		$('.chmak').css('left',$(this).offset().left)
		localStorage['voc']=$(this).attr('data-id');
	})
}
function csb(a,b){
	if (b<2.5){
		a.removeClass('mG');
		a.removeClass('mY');
		a.addClass('mR');
	}else if (b<3.5){
		a.removeClass('mG');
		a.removeClass('mR');
		a.addClass('mY');
	}else{
		a.removeClass('mR');
		a.removeClass('mY');
		a.addClass('mG');
	}
}
if (localStorage['ddat']==undefined){localStorage['ddat']='{"ch":{},"nl":{},"nr":{}}'}
dat=JSON.parse(localStorage['ddat']);
function change(th){
	if (dat['ch'][th.attr('data-id')]!=undefined){
		th.text(dat['ch'][th.attr('data-id')]);
		csb(th,dat['ch'][th.attr('data-id')])
	}
	if (dat['nr'][th.attr('data-id')]!=undefined){
		tm=th;
		a=dat['nr'][th.attr('data-id')]
		if (a<3){adc='mR';}
		else if (a==3){adc='mY';}
		else{adc='mG';}
		sessionStorage['fm']+=1;
		ti='f'+sessionStorage['fm'];
		tm.after('<span class="mark '+adc+' sl " title="Ответ на уроке, 19 октября 2018, 7 урок " data-id='+ti+' data-work_id='+ti+' data-num="0">'+a+'</span>');
		tm=$('.mark[data-id="'+ti+'"]');
		nmk(tm);
		change(tm)
	}
	if (dat['nl'][th.attr('data-id')]!=undefined){
		tm=th;
		a=dat['nl'][th.attr('data-id')]
		if (a<3){adc='mR';}
		else if (a==3){adc='mY';}
		else{adc='mG';}
		sessionStorage['fm']+=1;
		ti='f'+sessionStorage['fm'];
		tm.before('<span class="mark '+adc+' sl " title="Ответ на уроке, 19 октября 2018, 7 урок " data-id='+ti+' data-work_id='+ti+' data-num="0">'+a+'</span>');
		tm=$('.mark[data-id="'+ti+'"]');
		nmk(tm);
		change(tm)
	}
}
$('span').each(function(){
	change($(this))
})
$('.mark').click(function(){
$('.chmak').css('display','inline-block')
$('.chmak').css('top',$(this).offset().top-20)
$('.chmak').css('left',$(this).offset().left)
localStorage['voc']=$(this).attr('data-id');
})