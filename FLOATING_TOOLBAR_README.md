# Floating Toolbar for Inline Text Editing

A modular floating toolbar system that enhances your existing inline text editing functionality with rich text formatting capabilities.

## Features

- **Floating Toolbar**: Appears above selected text with formatting options
- **Text Selection**: Click and drag to select text, toolbar appears automatically
- **Rich Formatting**: Bold, italic, underline, font size, font family, colors, alignment
- **Keyboard Shortcuts**: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline)
- **Auto-hide**: Toolbar disappears when clicking outside or pressing Esc
- **Modular Architecture**: Separate components for different concerns
- **Tailwind CSS Styling**: Modern, responsive design with smooth animations

## Components

### 1. `useEditorState` Hook (`hooks/useEditorState.ts`)
Manages the editor state including:
- Text selection tracking
- Toolbar positioning
- Formatting state
- Keyboard shortcuts
- Event handling

### 2. `FloatingToolbar` Component (`components/editor/FloatingToolbar.tsx`)
The floating toolbar UI with:
- Text formatting buttons (bold, italic, underline)
- Font size and family dropdowns
- Color pickers for text and highlight
- Text alignment options
- Close button

### 3. `EditableText` Component (`components/editor/EditableText.tsx`)
Enhanced inline text editor that:
- Integrates with the floating toolbar
- Handles text selection and editing
- Maintains existing inline editing functionality
- Supports both click-to-edit and text selection modes

### 4. `ClickableHtmlPreview` Component (`components/editor/ClickableHtmlPreview.tsx`)
Updated to use the new `EditableText` component, maintaining backward compatibility.

## Usage

### Basic Implementation

```tsx
import EditableText from '@/components/editor/EditableText';

function MyEditor() {
  const [htmlContent, setHtmlContent] = useState('<p>Your HTML content here</p>');
  
  return (
    <EditableText
      htmlContent={htmlContent}
      onContentChange={setHtmlContent}
      className="my-editor"
    />
  );
}
```

### Using the Hook Directly

```tsx
import { useEditorState } from '@/hooks/useEditorState';

function CustomEditor() {
  const {
    selection,
    toolbarPosition,
    formatting,
    containerRef,
    applyFormatting,
    setFormatting
  } = useEditorState();
  
  // Custom implementation...
}
```

## How It Works

### Text Selection Flow
1. User selects text by clicking and dragging
2. `useEditorState` hook detects selection change
3. Toolbar position is calculated and displayed
4. User can apply formatting from the toolbar
5. Formatting is applied to selected text
6. Toolbar auto-hides when selection is cleared

### Inline Editing Flow
1. User clicks on text to edit inline
2. Input field appears at text location
3. User can edit text content
4. Press Enter to save or click outside to cancel
5. Content is updated in the HTML

## Keyboard Shortcuts

- **Ctrl+B**: Toggle bold
- **Ctrl+I**: Toggle italic  
- **Ctrl+U**: Toggle underline
- **Enter**: Save inline edit
- **Esc**: Cancel edit/hide toolbar

## Styling

The toolbar uses Tailwind CSS classes for:
- **Background**: White with subtle borders and shadows
- **Buttons**: Hover effects and active states
- **Animations**: Smooth fade-in/zoom-in effects
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: Proper contrast and focus states

## Customization

### Adding New Formatting Options

1. Extend the `FormattingState` interface in `useEditorState.ts`
2. Add new buttons to `FloatingToolbar.tsx`
3. Implement formatting logic in the `applyFormatting` function

### Modifying Toolbar Position

Update the `updateToolbarPosition` function in `useEditorState.ts` to change how the toolbar is positioned relative to selected text.

### Custom Styling

Modify the Tailwind classes in `FloatingToolbar.tsx` to match your design system.

## Demo

Visit `/editor/toolbar-demo` to see the floating toolbar in action with sample content.

## Browser Compatibility

- Modern browsers with ES6+ support
- Requires `document.getSelection()` API
- Works with contentEditable elements
- Responsive design for mobile and desktop

## Performance Considerations

- Event listeners are properly cleaned up
- Selection changes are debounced
- Toolbar positioning is optimized
- Minimal re-renders with React state management

## Troubleshooting

### Toolbar Not Appearing
- Check if text is properly selected
- Verify the `useEditorState` hook is connected
- Check browser console for errors

### Formatting Not Applied
- Ensure text is selected before applying formatting
- Check if the `applyFormatting` function is working
- Verify HTML structure is compatible

### Positioning Issues
- Check if container has proper positioning context
- Verify viewport coordinates are correct
- Ensure no CSS conflicts with positioning

## Future Enhancements

- **More Formatting Options**: Strikethrough, subscript, superscript
- **Custom Color Palettes**: User-defined color schemes
- **Format Painter**: Copy formatting from one text to another
- **Undo/Redo**: Formatting history management
- **Mobile Optimization**: Touch-friendly toolbar controls
- **Accessibility**: Screen reader support and keyboard navigation

## Contributing

When adding new features:
1. Maintain the modular architecture
2. Add proper TypeScript types
3. Include Tailwind CSS classes
4. Test with different HTML structures
5. Update this documentation
