export function getFormattedDate(date) {
	return `${date.getFullYear()}-${(date.getMonth().toString().length == 2 ? '' : '0') + (date.getMonth() + 1)}-${(date.getDate().toString().length == 2 ? '' : '0') + date.getDate()}`;
}
