// sets priority class
export default function setPriority(priority) {
  switch (priority) {
    case 'high':
      return 'high-priority';
    case 'med':
      return 'med-priority';
    case 'low':
      return 'low-priority';
    default:
      return 'low-priority';
  }
}
