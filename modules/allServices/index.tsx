import React from 'react'
import { getServices } from '../serviceList/api/getServices';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function AllServices() {
     const services = await getServices();
  const serviceList = services.data;
  return (
     <div className="min-h-screen bg-muted/30 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Available care
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Our services
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Choose a service and book an appointment at a time that works for
            you.
          </p>
        </div>

        {serviceList.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceList.map((service, index) => (
              <Card
                key={`${service.name}-${index}`}
                className="flex h-full flex-col transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="min-h-10 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="mt-1 font-medium">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Price</p>
                      <p className="mt-1 font-semibold">Rs.{service.price}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Book appointment</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            No services are available right now.
          </p>
        )}
      </div>
    </div>
  )
}
