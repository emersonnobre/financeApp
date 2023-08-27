export function getFormattedDate(date) {
	return `${(date.getDate().toString().length == 2 ? '' : '0') + date.getDate()}/${((date.getMonth() + 1).toString().length == 2 ? '' : '0') + (date.getMonth() + 1)}/${date.getFullYear()}`;
}
