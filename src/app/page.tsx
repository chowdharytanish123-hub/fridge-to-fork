@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --forest: #2F4F3E;
  --sage: #8FA58F;
  --ivory: #F7F3EA;
  --warm-white: #FFFDF8;
  --terracotta: #C86B4A;
  --mustard: #D5A447;
  --charcoal: #252A26;
  --olive: #6F766D;
  --success: #4F8A5B;
  --warning: #D69A32;
  --danger: #B85C55;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--ivory);
  color: var(--charcoal);
  font-family: Inter, sans-serif;
}

.card {
  @apply rounded-2xl border border-[#EAE2D8] bg-[#FFFDF8] shadow-soft;
}

.btn-primary {
  @apply inline-flex items-center justify-center rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#243d34];
}

.btn-secondary {
  @apply inline-flex items-center justify-center rounded-full border border-[#C8C2B8] bg-white px-5 py-3 text-sm font-medium text-charcoal transition hover:bg-[#F4EFE9];
}

.badge {
  @apply inline-flex items-center rounded-full bg-[#EDF4EE] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-forest;
}
