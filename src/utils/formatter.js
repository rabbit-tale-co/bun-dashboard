const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
});

const commaFormatter = new Intl.NumberFormat('en-US', {
  useGrouping: true,
});

export { compactFormatter, commaFormatter };
