import { Datatable } from '@/components/commons'
import { FC } from 'react'

const Content: FC = () => {
    
    const data = [
        {
            name: "Spaghetti Carbonara",
            description: "Classic Italian pasta with creamy sauce, bacon, and Parmesan cheese.",
            price: 12,
            createdAt: "2024-01-01T12:00:00Z",
            updatedAt: "2024-01-02T15:00:00Z",
          },
          {
            name: "Chicken Caesar Salad",
            description: "Fresh romaine lettuce with grilled chicken, croutons, and Caesar dressing.",
            price: 10,
            createdAt: "2024-01-03T10:00:00Z",
            updatedAt: "2024-01-04T13:00:00Z",
          },
          {
            name: "Margherita Pizza",
            description: "Wood-fired pizza topped with fresh mozzarella, basil, and tomato sauce.",
            price: 15,
            createdAt: "2024-01-05T14:30:00Z",
            updatedAt: "2024-01-06T16:00:00Z",
          },
          {
            name: "Beef Burger",
            description: "Juicy beef patty served with lettuce, tomato, cheese, and special sauce.",
            price: 8,
            createdAt: "2024-01-07T09:00:00Z",
            updatedAt: "2024-01-08T11:30:00Z",
          },
          {
            name: "Chicken Tacos",
            description: "Three soft tacos filled with seasoned grilled chicken, salsa, and avocado.",
            price: 9,
            createdAt: "2024-01-09T08:45:00Z",
            updatedAt: "2024-01-10T10:20:00Z",
          },
          {
            name: "Chocolate Cake",
            description: "Rich and moist chocolate cake with a velvety chocolate ganache topping.",
            price: 6,
            createdAt: "2024-01-11T14:00:00Z",
            updatedAt: "2024-01-12T17:15:00Z",
          },
          {
            name: "Sushi Platter",
            description: "Assorted sushi rolls with fresh fish, rice, and seaweed, served with soy sauce.",
            price: 20,
            createdAt: "2024-01-13T18:30:00Z",
            updatedAt: "2024-01-14T20:00:00Z",
          },
          {
            name: "Grilled Salmon",
            description: "Perfectly grilled salmon fillet with a lemon-butter sauce and vegetables.",
            price: 18,
            createdAt: "2024-01-15T12:30:00Z",
            updatedAt: "2024-01-16T14:45:00Z",
          },
          {
            name: "Pancakes with Syrup",
            description: "Fluffy pancakes topped with maple syrup and a side of fresh fruits.",
            price: 7,
            createdAt: "2024-01-17T09:00:00Z",
            updatedAt: "2024-01-18T10:30:00Z",
          },
          {
            name: "Vegetable Stir-fry",
            description: "Healthy stir-fried vegetables with soy sauce and sesame seeds, served with rice.",
            price: 11,
            createdAt: "2024-01-19T11:45:00Z",
            updatedAt: "2024-01-20T13:20:00Z",
          },
    ];
    
    return (
        <div className="container mx-auto p-6">
            <Datatable data={data} />
        </div>
    )
}

export default Content