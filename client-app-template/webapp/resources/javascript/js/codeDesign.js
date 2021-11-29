
	//resize text area
	function resizeTextArea(elem) {
		elem.height(1);
		elem.scrollTop(0);
		elem
				.height(elem[0].scrollHeight - elem[0].clientHeight
						+ elem.height());
	}