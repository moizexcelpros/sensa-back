export interface IMeUser {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	phone?: string;
	address?: string;
	city?: string;
	country?: string;
	postalCode?: string;
	profilePicture?: string;
}