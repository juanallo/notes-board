const mouseEvent = (eventName) => (x = 0, y = 0) =>{
	const evt = document.createEvent('MouseEvents');
	evt.initMouseEvent(eventName, true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
	document.dispatchEvent(evt);
	return evt;
};

export const mouseUp= mouseEvent('mouseup');
export const mouseMove= mouseEvent('mousemove');