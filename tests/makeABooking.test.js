import { makeABooking } from "../src/resolvers/mutation";

describe("Make a booking", () => {
  test("Successfully able to make a booking", async () => {
    const args = {
      listingId: "a114dded-ddef-4052-a106-bb18b94e6b51",
      bookingDate: "24-Apr-20",
      size: 2,
      customerEmail: "angela@dundler.com",
      customers: [
        {
          name: "Dwight",
          surname: "Shrut",
          passportNumber: "3333344",
          physioScore: "454",
        },
        {
          name: "Pam",
          surname: "Papper",
          passportNumber: "34354",
          physioScore: "2945",
        },
      ],
    };

    const context = "context";

    const response = await makeABooking(args, context);

    console.log(response);
  });
});
