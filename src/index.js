addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    headers.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    return new Response(null, { headers });
  }

  const data = await request.json();
  const { email } = data;
  
  // Use Mailchimp API to add the email to the mailing list
  // You will need to import the `fetch` function and pass in your API key and the list ID
  const response = await fetch(
    MAILCHIMP_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    }
  );

  // Return a response indicating whether the email signup was successful or not
  if (response.ok) {
    return new Response(
      JSON.stringify({ message: "Thank you for signing up!" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "An error occurred. Please try again later." }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
