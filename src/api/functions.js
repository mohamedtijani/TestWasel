import Toast from 'react-native-root-toast'

export function Error(msg) {
	Toast.show(msg, {
		duration: Toast.durations.LONG,
		position: Toast.positions.BOTTOM,
		shadow: true,
		animation: true,
		backgroundColor: "#f96767",
		hideOnPress: true,
		delay: 50
	});
}

export function Success(msg) {
	Toast.show(msg, {
		duration: Toast.durations.LONG,
		position: Toast.positions.BOTTOM,
		shadow: true,
		animation: true,
		backgroundColor: "#26C875",
		hideOnPress: true,
		delay: 50
	});
}

export function extractData(resp) {

	if (resp == null)
		return null;
	let response = resp

	let statusCode = response.status;

	let respBody = JSON.parse(response._bodyInit);
	if (statusCode >= 200 && statusCode < 300) {
		if (respBody ) {
			return respBody
		}
	} else {
		const extractedError = respBody.errorMessage;
		throw extractedError;
	}
}