const schema = `

type ListingType {
     name: String
   }
   
   type ListingActivities {
     name: String
   }
   
   type Guide {
     Name: String
     Bio: String
     Avatar: String
   }
   
   type Listing {
        listingId: String
        coverPhoto: String
        listingName: String
        listingDescription: String
        listingType: [ListingType]
        listingLocation: String
        listingActivities: [ListingActivities]
        specialType: String
        specialAmount: Int
        rating: Int
        guide: Guide
        price: String
        numberOfDays: Int
     
     }
   

     type Booking {
          bookingId: String
          listingId: String
          bookingDate: String
          size: Int
          bookingTotal: String
          customerEmail: String
          customers: [Customer]
          chargeReciept: String
      
      }
      type Customer {
        name: String
        surname: String
        country: String
        passportNumber: String
        physioScore: String
      }
    
      input CustomerInput {
        name: String
        surname: String
        country: String
        passportNumber: String
        physioScore: String
      }
    

"""
A hello world Query
"""
type Query {
     hello: String!
     getAllListings: [Listing]
     getAListing(listingId: String!): Listing!

}


type Mutation {
     makeABooking(
       listingId: String
       bookingDate: String,
       customerEmail: String,
       customers: [CustomerInput]
     ): Booking
   
   }
   
`;

export { schema };
