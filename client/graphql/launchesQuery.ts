export const GET_LAUNCHES_QUERY = gql`
	query {
		launches {
			id
			mission_id
			mission_name
			launch_date_local
			launch_site {
				site_id
				site_name
				site_name_long
			}
			rocket {
				rocket_name
				rocket_type
				rocket {
					name
					description
					first_flight
					height {
						feet
					}
					diameter {
						meters
					}
					mass {
						kg
					}
				}
			}
			details
		}
	}
`

export type Launch = {
	id: string
	mission_id: string
	mission_name: string[]
	launch_date_local: Date
	launch_site: {
		site_id: string
		site_name: string | null
		site_name_long: string | null
	} | null
	rocket: {
		rocket_name: string
		rocket_type: string
		rocket: {
			name: string
			description: string | null
			first_flight: string | null
			height: {
				feet: number | null
			} | null
			diameter: {
				meters: number | null
			} | null
			mass: {
				kg: number | null
			} | null
		} | null
	}
	details: string | null
}
