# AI Sports Betting Platform

An advanced sports betting analysis and prediction platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Predictive Model Builder**: Create and train custom betting models using historical data
- **Learner Mode**: Interactive lessons and challenges for improving betting strategies
- **Simulator**: Test betting strategies with simulated bankroll management
- **Dashboard**: Real-time predictions and performance analytics
- **+EV Panel**: Identify positive expected value betting opportunities

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-sports-betting.git
cd ai-sports-betting
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-sports-betting/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── learner/          # Learner mode page
│   ├── simulator/        # Simulator page
│   └── model-builder/    # Model builder page
├── components/            # React components
│   ├── ui/              # UI components
│   └── ...              # Feature components
├── lib/                  # Utility functions and API
└── public/              # Static assets
```

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_API_URL`: The URL of your API server (default: http://localhost:3000/api)
- `NEXT_PUBLIC_API_KEY`: Your API key for authentication

Create a `.env.local` file in the root directory and add these variables with your values.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Recharts](https://recharts.org/) - Data visualization
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 