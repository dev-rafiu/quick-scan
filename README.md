# QuickScan

A simple and fast web-based QR code and barcode scanner built with React and TypeScript. QuickScan allows you to scan codes using your device's camera or by uploading images.

## Features

- 📱 **Camera Scanning**: Real-time QR code and barcode scanning using your device's camera
- 📁 **Image Upload**: Upload images containing QR codes or barcodes for scanning
- 📋 **Copy to Clipboard**: Easy copying of scanned codes with one click
- 🎨 **Modern UI**: Clean and intuitive interface built with Tailwind CSS
- 📱 **PWA Support**: Progressive Web App capabilities for mobile installation
- ⚡ **Fast Processing**: Quick and efficient code detection

## Supported Code Types

- QR Codes
- Barcodes (various formats)
- Data Matrix codes

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QuickScan
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Camera Scanning**:
   - Click the scan button
   - Select "Use Camera"
   - Point your camera at a QR code or barcode
   - The code will be automatically detected and displayed

2. **Image Upload**:
   - Click the scan button
   - Select "Upload Image"
   - Choose an image file containing a QR code or barcode
   - The code will be extracted and displayed

3. **Copy Results**:
   - Once a code is scanned, it will be displayed in a drawer
   - Use the copy button to copy the scanned code to your clipboard

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ iOS Safari (limited camera support)

## Known Issues

- **iOS Support**: Camera functionality on iOS devices (Safari) is limited due to browser restrictions. For the best experience on iOS, use the image upload feature instead of the camera scanner.

## Technology Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling
- **html5-qrcode** - QR code and barcode scanning library
- **Radix UI** - Accessible UI components
- **Lucide React** - Icons
- **PWA Plugin** - Progressive Web App support

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run dev:expose` - Start development server with network access
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── Scanner.tsx      # Main scanner component
│   ├── CopyButton.tsx   # Copy to clipboard functionality
│   └── ui/              # Reusable UI components
├── App.tsx              # Main app component
└── main.tsx             # App entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the repository.
