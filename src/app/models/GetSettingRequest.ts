/**
 * Represents the request contract for GetSetting endpoint.
 */
export class GetSettingRequest {
	/**
	 * Gets or sets program slug.
	 */
	public slug: string = undefined;

	/**
	 * Gets or sets IP address where the calling program is running.
	 */
	public ipAddress: string = undefined;
}