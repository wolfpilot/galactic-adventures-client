// // import { type QueryClient } from "@tanstack/react-query"

// // Types
// import { ApiBaseResponse } from "@ts/api.types"
// import { type Destination } from "@ts/products/adventures.types"

// import { queryClient } from "@utils/providers/Query.providers"

// export type GetAllDestinationsResponse = ApiBaseResponse<{
//   destinations: Destination[] | null
// }>

// // Setup
// const { VITE_SERVER_URL = "" } = import.meta.env

// const getAllDestinations = (): Promise<GetAllDestinationsResponse> =>
//   fetch(`${VITE_SERVER_URL}/products/adventures`).then((res) => res.json())

// const allDestinationsQuery = () => ({
//   queryKey: ["destinations", "all"],
//   queryFn: async () => getAllDestinations(),
// })

// export const adventuresPageLoader =
//   // (queryClient: QueryClient) =>
//   async () => {
//     const query = allDestinationsQuery()

//     return (
//       queryClient.getQueryData(query.queryKey) ??
//       (await queryClient.fetchQuery(query))
//     )
//   }
