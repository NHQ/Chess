module.exports = setUIControls

function setUIControls(){
	var x = $('.boardOptions > h1')
		,	opts = $('.boardOptions')
		,	table = $('#table')
	;
	x.click(function(){
		opts.toggleClass('hoverd');
		table.one('click drag', function(){
			opts.removeClass('hoverd');
		})
	})
}