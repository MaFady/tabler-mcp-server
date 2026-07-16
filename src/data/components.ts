/**
 * Curated catalogue of Tabler UI components with ready-to-paste HTML snippets.
 * Markup follows @tabler/core 1.4.x conventions (docs.tabler.io).
 */

export interface ComponentSnippet {
  title: string;
  html: string;
}

export interface TablerComponent {
  slug: string;
  name: string;
  description: string;
  docsUrl: string;
  /** Extra requirements: JS plugins, third-party libraries, plugin CSS files. */
  requires?: string[];
  notes?: string[];
  snippets: ComponentSnippet[];
}

const D = "https://docs.tabler.io/ui";

export const components: TablerComponent[] = [
  {
    slug: "alert",
    name: "Alerts",
    description:
      "Contextual feedback messages for user actions (success, info, warning, danger).",
    docsUrl: `${D}/components/alerts`,
    snippets: [
      {
        title: "Basic alerts",
        html: `<div class="alert alert-success" role="alert">Your account has been saved!</div>
<div class="alert alert-info" role="alert">Here is some information.</div>
<div class="alert alert-warning" role="alert">Please check the form again.</div>
<div class="alert alert-danger" role="alert">Something went wrong.</div>`,
      },
      {
        title: "Alert with icon, title and description",
        html: `<div class="alert alert-success" role="alert">
  <div class="alert-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon alert-icon icon-2"><path d="M5 12l5 5l10 -10" /></svg>
  </div>
  <div>
    <h4 class="alert-heading">Wow! Everything worked!</h4>
    <div class="alert-description">Your account has been saved!</div>
  </div>
</div>`,
      },
      {
        title: "Dismissible alert",
        html: `<div class="alert alert-warning alert-dismissible" role="alert">
  <div>
    <h4 class="alert-heading">Some information is missing!</h4>
    <div class="alert-description">Please check the form and try again.</div>
  </div>
  <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
</div>`,
      },
      {
        title: "Important alert (filled)",
        html: `<div class="alert alert-important alert-danger alert-dismissible" role="alert">
  <div>Your account has been deleted and can no longer be restored!</div>
  <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
</div>`,
      },
    ],
  },
  {
    slug: "avatar",
    name: "Avatars",
    description:
      "User avatars with images, initials, statuses, badges, sizes and stacked lists.",
    docsUrl: `${D}/components/avatars`,
    snippets: [
      {
        title: "Basic avatars (image / initials)",
        html: `<span class="avatar" style="background-image: url(./static/avatars/000m.jpg)"></span>
<span class="avatar">JL</span>
<span class="avatar avatar-rounded">AB</span>`,
      },
      {
        title: "Sizes",
        html: `<span class="avatar avatar-xs">XS</span>
<span class="avatar avatar-sm">SM</span>
<span class="avatar">MD</span>
<span class="avatar avatar-lg">LG</span>
<span class="avatar avatar-xl">XL</span>`,
      },
      {
        title: "Avatar with status badge",
        html: `<span class="avatar">
  SA
  <span class="badge bg-success"></span>
</span>`,
      },
      {
        title: "Avatar list (stacked)",
        html: `<div class="avatar-list avatar-list-stacked">
  <span class="avatar avatar-sm" style="background-image: url(./static/avatars/000m.jpg)"></span>
  <span class="avatar avatar-sm">JL</span>
  <span class="avatar avatar-sm" style="background-image: url(./static/avatars/002m.jpg)"></span>
  <span class="avatar avatar-sm">+8</span>
</div>`,
      },
    ],
  },
  {
    slug: "badge",
    name: "Badges",
    description:
      "Small count and labeling components: solid, light, outline, pill and notification dots.",
    docsUrl: `${D}/components/badges`,
    notes: [
      "Tabler pairs background utilities with matching foreground utilities: bg-blue + text-blue-fg.",
      "Light variants use the -lt suffix: bg-blue-lt.",
    ],
    snippets: [
      {
        title: "Solid badges",
        html: `<span class="badge bg-blue text-blue-fg">Blue</span>
<span class="badge bg-red text-red-fg">Red</span>
<span class="badge bg-green text-green-fg">Green</span>
<span class="badge bg-yellow text-yellow-fg">Yellow</span>`,
      },
      {
        title: "Light badges",
        html: `<span class="badge bg-blue-lt">Blue</span>
<span class="badge bg-red-lt">Red</span>
<span class="badge bg-green-lt">Green</span>`,
      },
      {
        title: "Outline & pill badges",
        html: `<span class="badge badge-outline text-blue">Outline</span>
<span class="badge bg-blue text-blue-fg badge-pill">10</span>`,
      },
      {
        title: "Notification badge on a button",
        html: `<button class="btn position-relative">
  Inbox
  <span class="badge bg-red badge-notification badge-pill">4</span>
</button>`,
      },
    ],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    description: "Navigation hierarchy indicator with dots, arrows or bullets separators.",
    docsUrl: `${D}/components/breadcrumb`,
    snippets: [
      {
        title: "Basic breadcrumb",
        html: `<ol class="breadcrumb" aria-label="breadcrumbs">
  <li class="breadcrumb-item"><a href="#">Home</a></li>
  <li class="breadcrumb-item"><a href="#">Library</a></li>
  <li class="breadcrumb-item active" aria-current="page"><a href="#">Data</a></li>
</ol>`,
      },
      {
        title: "Separator variants",
        html: `<ol class="breadcrumb breadcrumb-dots" aria-label="breadcrumbs">...</ol>
<ol class="breadcrumb breadcrumb-arrows" aria-label="breadcrumbs">...</ol>
<ol class="breadcrumb breadcrumb-bullets" aria-label="breadcrumbs">...</ol>`,
      },
    ],
  },
  {
    slug: "button",
    name: "Buttons",
    description:
      "Buttons in all variants: solid, outline, ghost, pill, square, icon-only, loading, sizes and social colors.",
    docsUrl: `${D}/components/buttons`,
    snippets: [
      {
        title: "Basic variants",
        html: `<a href="#" class="btn">Default</a>
<a href="#" class="btn btn-primary">Primary</a>
<a href="#" class="btn btn-success">Success</a>
<a href="#" class="btn btn-danger">Danger</a>
<a href="#" class="btn btn-outline-primary">Outline</a>
<a href="#" class="btn btn-ghost-primary">Ghost</a>`,
      },
      {
        title: "Shapes and sizes",
        html: `<a href="#" class="btn btn-primary btn-pill">Pill</a>
<a href="#" class="btn btn-primary btn-square">Square</a>
<a href="#" class="btn btn-sm">Small</a>
<a href="#" class="btn btn-lg">Large</a>`,
      },
      {
        title: "Button with icon / icon-only",
        html: `<a href="#" class="btn btn-primary">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
  Create new report
</a>
<a href="#" class="btn btn-icon" aria-label="Button">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
</a>`,
      },
      {
        title: "Loading & disabled states",
        html: `<a href="#" class="btn btn-primary btn-loading">Loading</a>
<button type="button" class="btn" disabled>Disabled</button>`,
      },
      {
        title: "Button list wrapper",
        html: `<div class="btn-list">
  <a href="#" class="btn">Save changes</a>
  <a href="#" class="btn btn-primary">Save and continue</a>
</div>`,
      },
    ],
  },
  {
    slug: "card",
    name: "Cards",
    description:
      "Flexible content containers with headers, footers, statuses, ribbons, stamps and states.",
    docsUrl: `${D}/components/cards`,
    snippets: [
      {
        title: "Basic card",
        html: `<div class="card">
  <div class="card-body">
    <h3 class="card-title">Card title</h3>
    <p class="text-secondary">Card content goes here.</p>
  </div>
</div>`,
      },
      {
        title: "Card with header and footer",
        html: `<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card title</h3>
    <div class="card-actions">
      <a href="#" class="btn btn-primary">Action</a>
    </div>
  </div>
  <div class="card-body">
    <p>Card content</p>
  </div>
  <div class="card-footer">Card footer</div>
</div>`,
      },
      {
        title: "Card with status indicator",
        html: `<div class="card">
  <div class="card-status-top bg-danger"></div>
  <div class="card-body">Card with top status</div>
</div>
<div class="card">
  <div class="card-status-start bg-green"></div>
  <div class="card-body">Card with side status</div>
</div>`,
      },
      {
        title: "Card states",
        html: `<a href="#" class="card card-link">
  <div class="card-body">Card with link hover effect</div>
</a>
<div class="card card-active">
  <div class="card-body">Active card</div>
</div>
<div class="card card-inactive">
  <div class="card-body">Inactive card</div>
</div>
<div class="card card-borderless">
  <div class="card-body">Borderless card</div>
</div>`,
      },
      {
        title: "Card with stamp",
        html: `<div class="card">
  <div class="card-stamp">
    <div class="card-stamp-icon bg-yellow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
    </div>
  </div>
  <div class="card-body">
    <h3 class="card-title">Card with stamp</h3>
    <p class="text-secondary">Content next to a decorative corner icon.</p>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "carousel",
    name: "Carousel",
    description: "Slideshow for cycling through images or slides of content.",
    docsUrl: `${D}/components/carousel`,
    requires: ["tabler.min.js (bundles Bootstrap carousel)"],
    snippets: [
      {
        title: "Basic carousel with indicators and controls",
        html: `<div id="carousel-default" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carousel-default" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#carousel-default" data-bs-slide-to="1"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" alt="" src="./static/photos/slide-1.jpg" />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" alt="" src="./static/photos/slide-2.jpg" />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel-default" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel-default" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`,
      },
    ],
  },
  {
    slug: "chart",
    name: "Charts",
    description:
      "Charts in Tabler demos are built with ApexCharts (line, area, bar, pie, heatmap...).",
    docsUrl: `${D}/components/charts`,
    requires: ["ApexCharts: https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.js"],
    notes: [
      "Tabler does not ship its own chart library; demos use ApexCharts with Tabler CSS variables for colors.",
      "Use tabler-vendors.min.css for third-party widget styling.",
      "For production, pin the library version and add Subresource Integrity (integrity + crossorigin) to CDN script tags.",
    ],
    snippets: [
      {
        title: "ApexCharts line chart in a card",
        html: `<div class="card">
  <div class="card-body">
    <h3 class="card-title">Sales</h3>
    <div id="chart-sales" class="chart-lg"></div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.js" defer></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    new ApexCharts(document.getElementById("chart-sales"), {
      chart: { type: "line", height: 240, toolbar: { show: false } },
      series: [{ name: "Sales", data: [37, 35, 44, 28, 36, 24, 65] }],
      stroke: { width: 2, lineCap: "round", curve: "smooth" },
      colors: ["var(--tblr-primary)"],
      grid: { strokeDashArray: 4 },
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    }).render();
  });
</script>`,
      },
    ],
  },
  {
    slug: "datagrid",
    name: "Data grid",
    description: "Key/value description list arranged in a responsive grid.",
    docsUrl: `${D}/components/data-grid`,
    snippets: [
      {
        title: "Basic datagrid",
        html: `<div class="datagrid">
  <div class="datagrid-item">
    <div class="datagrid-title">Registrar</div>
    <div class="datagrid-content">Third Party</div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Port number</div>
    <div class="datagrid-content">3306</div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Expiration date</div>
    <div class="datagrid-content">–</div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Creator</div>
    <div class="datagrid-content">
      <div class="d-flex align-items-center">
        <span class="avatar avatar-xs me-2 rounded" style="background-image: url(./static/avatars/000m.jpg)"></span>
        Paweł Kuna
      </div>
    </div>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "divider",
    name: "Divider",
    description: "Horizontal rules with optional centered, left or right text.",
    docsUrl: `${D}/components/divider`,
    snippets: [
      {
        title: "Dividers",
        html: `<div class="hr-text">Divider with text</div>
<div class="hr-text hr-text-left">Left text</div>
<div class="hr-text hr-text-right">Right text</div>`,
      },
    ],
  },
  {
    slug: "dropdown",
    name: "Dropdowns",
    description: "Toggleable contextual menus with headers, dividers, icons and arrows.",
    docsUrl: `${D}/components/dropdowns`,
    requires: ["tabler.min.js (bundles Bootstrap dropdown)"],
    snippets: [
      {
        title: "Basic dropdown",
        html: `<div class="dropdown">
  <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>`,
      },
      {
        title: "Dropdown with header, icons and arrow",
        html: `<div class="dropdown">
  <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">Options</button>
  <div class="dropdown-menu dropdown-menu-arrow">
    <span class="dropdown-header">Dropdown header</span>
    <a class="dropdown-item" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon dropdown-item-icon icon-2"><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
      Settings
    </a>
    <a class="dropdown-item disabled" href="#">Disabled</a>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "empty",
    name: "Empty states",
    description: "Placeholder screens for empty lists, no search results or error pages.",
    docsUrl: `${D}/components/empty-states`,
    snippets: [
      {
        title: "Empty state with action",
        html: `<div class="empty">
  <div class="empty-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
  </div>
  <p class="empty-title">No results found</p>
  <p class="empty-subtitle text-secondary">Try adjusting your search or filter to find what you're looking for.</p>
  <div class="empty-action">
    <a href="#" class="btn btn-primary">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      Add your first client
    </a>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "icon",
    name: "Icons (usage)",
    description:
      "How to embed Tabler Icons in markup: inline SVG or webfont. Use the search_icons / get_icon tools to fetch actual icons.",
    docsUrl: `${D}/components/icons`,
    snippets: [
      {
        title: "Inline SVG icon",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2">
  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
</svg>`,
      },
      {
        title: "Webfont icon",
        html: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
<i class="ti ti-heart"></i>
<i class="ti ti-heart-filled text-red"></i>`,
      },
    ],
  },
  {
    slug: "modal",
    name: "Modals",
    description:
      "Dialog windows: basic, centered, scrollable, sizes, blurred backdrop, status bar, danger/success prompts.",
    docsUrl: `${D}/components/modals`,
    requires: ["tabler.min.js (bundles Bootstrap modal)"],
    snippets: [
      {
        title: "Basic modal + trigger",
        html: `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-simple">Open modal</button>

<div class="modal" id="modal-simple" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">Modal body text goes here.</div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`,
      },
      {
        title: "Danger confirmation modal with status bar",
        html: `<div class="modal" id="modal-danger" tabindex="-1">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
    <div class="modal-content">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="modal-status bg-danger"></div>
      <div class="modal-body text-center py-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon mb-2 text-danger icon-lg"><path d="M12 9v4" /><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" /><path d="M12 16h.01" /></svg>
        <h3>Are you sure?</h3>
        <div class="text-secondary">Do you really want to remove 84 files? What you've done cannot be undone.</div>
      </div>
      <div class="modal-footer">
        <div class="w-100">
          <div class="row">
            <div class="col"><a href="#" class="btn w-100" data-bs-dismiss="modal">Cancel</a></div>
            <div class="col"><a href="#" class="btn btn-danger w-100" data-bs-dismiss="modal">Delete 84 items</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      },
      {
        title: "Blurred backdrop",
        html: `<div class="modal modal-blur" id="modal-blur" tabindex="-1">
  <!-- same structure as a basic modal -->
</div>`,
      },
    ],
  },
  {
    slug: "offcanvas",
    name: "Offcanvas",
    description: "Sidebar panels sliding from start, end, top or bottom edges.",
    docsUrl: `${D}/components/offcanvas`,
    requires: ["tabler.min.js (bundles Bootstrap offcanvas)"],
    snippets: [
      {
        title: "Offcanvas end + trigger",
        html: `<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" aria-controls="offcanvasEnd">Toggle offcanvas</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
  <div class="offcanvas-header">
    <h2 class="offcanvas-title" id="offcanvasEndLabel">Offcanvas title</h2>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <p>Content for the offcanvas goes here.</p>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "pagination",
    name: "Pagination",
    description: "Page navigation with prev/next arrows, active and disabled states.",
    docsUrl: `${D}/components/pagination`,
    snippets: [
      {
        title: "Pagination",
        html: `<ul class="pagination">
  <li class="page-item disabled">
    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M15 6l-6 6l6 6" /></svg>
      prev
    </a>
  </li>
  <li class="page-item"><a class="page-link" href="#">1</a></li>
  <li class="page-item active"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">3</a></li>
  <li class="page-item">
    <a class="page-link" href="#">
      next
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M9 6l6 6l-6 6" /></svg>
    </a>
  </li>
</ul>`,
      },
    ],
  },
  {
    slug: "placeholder",
    name: "Placeholder",
    description: "Loading skeletons for text, images, avatars and cards.",
    docsUrl: `${D}/components/placeholder`,
    snippets: [
      {
        title: "Card skeleton",
        html: `<div class="card placeholder-glow">
  <div class="ratio ratio-21x9 card-img-top placeholder"></div>
  <div class="card-body">
    <div class="placeholder col-9 mb-3"></div>
    <div class="placeholder placeholder-xs col-10"></div>
    <div class="placeholder placeholder-xs col-11"></div>
    <div class="mt-3">
      <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-4" aria-hidden="true"></a>
    </div>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "popover",
    name: "Popovers",
    description: "Rich hover/click overlays with title and content.",
    docsUrl: `${D}/components/popovers`,
    requires: ["tabler.min.js — Tabler auto-initializes elements with data-bs-toggle=\"popover\""],
    snippets: [
      {
        title: "Popover",
        html: `<button type="button" class="btn" data-bs-toggle="popover" data-bs-placement="top"
  data-bs-title="Popover title"
  data-bs-content="And here's some amazing content. It's very engaging. Right?">
  Click to toggle popover
</button>`,
      },
    ],
  },
  {
    slug: "progress",
    name: "Progress bars",
    description: "Progress indicators with sizes, colors and indeterminate state.",
    docsUrl: `${D}/components/progress-bars`,
    snippets: [
      {
        title: "Progress bar",
        html: `<div class="progress">
  <div class="progress-bar" style="width: 38%" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" aria-label="38% Complete">
    <span class="visually-hidden">38% Complete</span>
  </div>
</div>`,
      },
      {
        title: "Small, colored and indeterminate",
        html: `<div class="progress progress-sm">
  <div class="progress-bar bg-green" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress progress-sm">
  <div class="progress-bar progress-bar-indeterminate"></div>
</div>`,
      },
    ],
  },
  {
    slug: "ribbon",
    name: "Ribbons",
    description: "Decorative corner ribbons for cards: colors, positions, bookmark style.",
    docsUrl: `${D}/components/ribbons`,
    snippets: [
      {
        title: "Card with ribbons",
        html: `<div class="card">
  <div class="ribbon bg-red">New</div>
  <div class="card-body">Card with a top-right ribbon</div>
</div>
<div class="card">
  <div class="ribbon ribbon-top bg-yellow">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-2"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
  </div>
  <div class="card-body">Card with a bookmark ribbon</div>
</div>
<div class="card">
  <div class="ribbon ribbon-start bg-green">-50%</div>
  <div class="card-body">Card with a left ribbon</div>
</div>`,
      },
    ],
  },
  {
    slug: "segmented-control",
    name: "Segmented control",
    description: "iOS-style segmented switch built on nav pills.",
    docsUrl: `${D}/components/segmented-control`,
    snippets: [
      {
        title: "Segmented control",
        html: `<nav class="nav nav-segmented" role="tablist">
  <button class="nav-link active" role="tab" aria-selected="true" aria-current="page">All</button>
  <button class="nav-link" role="tab" aria-selected="false">Active</button>
  <button class="nav-link" role="tab" aria-selected="false">Archived</button>
</nav>`,
      },
    ],
  },
  {
    slug: "spinner",
    name: "Spinners",
    description: "Loading indicators: border and growing, sizes, colors, in buttons.",
    docsUrl: `${D}/components/spinners`,
    snippets: [
      {
        title: "Spinners",
        html: `<div class="spinner-border" role="status"></div>
<div class="spinner-border spinner-border-sm text-blue" role="status"></div>
<div class="spinner-grow text-red" role="status"></div>

<button type="button" class="btn btn-primary" disabled>
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Loading...
</button>`,
      },
    ],
  },
  {
    slug: "status",
    name: "Statuses",
    description: "Status labels, dots and animated indicators.",
    docsUrl: `${D}/components/statuses`,
    snippets: [
      {
        title: "Status variants",
        html: `<span class="status status-green">Active</span>
<span class="status status-red">Banned</span>

<span class="status status-green">
  <span class="status-dot status-dot-animated"></span>
  Online
</span>

<span class="status-dot status-green"></span>
<span class="status-dot status-dot-animated status-red"></span>

<span class="status-indicator status-green status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>`,
      },
    ],
  },
  {
    slug: "steps",
    name: "Steps",
    description: "Wizard progress steps: horizontal, vertical, counters, colors.",
    docsUrl: `${D}/components/steps`,
    snippets: [
      {
        title: "Steps",
        html: `<div class="steps">
  <a href="#" class="step-item">Order</a>
  <a href="#" class="step-item">Payment</a>
  <span class="step-item active">Delivery</span>
  <span class="step-item">Confirmation</span>
</div>

<div class="steps steps-counter steps-green">
  <a href="#" class="step-item">Step 1</a>
  <span class="step-item active">Step 2</span>
  <span class="step-item">Step 3</span>
</div>`,
      },
    ],
  },
  {
    slug: "switch-icon",
    name: "Switch icon",
    description: "Two-state icon toggle (e.g. like/unlike) switched on click.",
    docsUrl: `${D}/components/switch-icon`,
    requires: ["tabler.min.js — auto-initializes data-bs-toggle=\"switch-icon\""],
    snippets: [
      {
        title: "Heart like toggle",
        html: `<button type="button" class="switch-icon" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
  </span>
  <span class="switch-icon-b text-red">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-2"><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg>
  </span>
</button>`,
      },
    ],
  },
  {
    slug: "table",
    name: "Tables",
    description:
      "Data tables: responsive wrapper, vertical centering, card integration, striped/hover, sorting headers.",
    docsUrl: `${D}/components/tables`,
    snippets: [
      {
        title: "Table in a card",
        html: `<div class="card">
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Email</th>
          <th>Role</th>
          <th class="w-1"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Paweł Kuna</td>
          <td class="text-secondary">UI Designer, Training</td>
          <td class="text-secondary"><a href="#" class="text-reset">paweluna@howstuffworks.com</a></td>
          <td class="text-secondary">User</td>
          <td><a href="#">Edit</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
      },
      {
        title: "Variants",
        html: `<table class="table table-striped">...</table>
<table class="table table-hover">...</table>
<table class="table table-sm table-nowrap">...</table>`,
      },
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Tab navigation, including tabs in card headers.",
    docsUrl: `${D}/components/tabs`,
    requires: ["tabler.min.js (bundles Bootstrap tab)"],
    snippets: [
      {
        title: "Card with tabs",
        html: `<div class="card">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <a href="#tabs-home" class="nav-link active" data-bs-toggle="tab" aria-selected="true" role="tab">Home</a>
      </li>
      <li class="nav-item" role="presentation">
        <a href="#tabs-profile" class="nav-link" data-bs-toggle="tab" aria-selected="false" role="tab" tabindex="-1">Profile</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <div class="tab-content">
      <div class="tab-pane active show" id="tabs-home" role="tabpanel">Home tab content</div>
      <div class="tab-pane" id="tabs-profile" role="tabpanel">Profile tab content</div>
    </div>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "timeline",
    name: "Timelines",
    description: "Vertical event feed with icons and cards.",
    docsUrl: `${D}/components/timelines`,
    snippets: [
      {
        title: "Timeline",
        html: `<ul class="timeline">
  <li class="timeline-event">
    <div class="timeline-event-icon bg-x-lt">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
    </div>
    <div class="card timeline-event-card">
      <div class="card-body">
        <div class="text-secondary float-end">10 hrs ago</div>
        <h4>+1150 Followers</h4>
        <p class="text-secondary">You're getting more and more followers, keep it up!</p>
      </div>
    </div>
  </li>
  <li class="timeline-event">
    <div class="timeline-event-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>
    </div>
    <div class="card timeline-event-card">
      <div class="card-body">
        <div class="text-secondary float-end">2 days ago</div>
        <h4>Product update</h4>
        <p class="text-secondary">Version 2.3 has been released.</p>
      </div>
    </div>
  </li>
</ul>`,
      },
    ],
  },
  {
    slug: "toast",
    name: "Toasts",
    description: "Lightweight push notifications.",
    docsUrl: `${D}/components/toasts`,
    requires: ["tabler.min.js (bundles Bootstrap toast) — call new bootstrap.Toast(el).show() to display"],
    snippets: [
      {
        title: "Toast",
        html: `<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" data-bs-toggle="toast">
  <div class="toast-header">
    <span class="avatar avatar-xs me-2" style="background-image: url(./static/avatars/000m.jpg)"></span>
    <strong class="me-auto">Mallory Hulme</strong>
    <small>11 mins ago</small>
    <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">Hello, world! This is a toast message.</div>
</div>`,
      },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltips",
    description: "Small hover hints on any element.",
    docsUrl: `${D}/components/tooltips`,
    requires: ["tabler.min.js — Tabler auto-initializes elements with data-bs-toggle=\"tooltip\""],
    snippets: [
      {
        title: "Tooltips",
        html: `<button type="button" class="btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">Top</button>
<button type="button" class="btn" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">Bottom</button>`,
      },
    ],
  },
  {
    slug: "tracking",
    name: "Tracking",
    description: "Uptime/status tracking blocks (like status pages).",
    docsUrl: `${D}/components/tracking`,
    snippets: [
      {
        title: "Tracking",
        html: `<div class="tracking">
  <div class="tracking-block bg-success" data-bs-toggle="tooltip" data-bs-title="operational"></div>
  <div class="tracking-block bg-success" data-bs-toggle="tooltip" data-bs-title="operational"></div>
  <div class="tracking-block bg-warning" data-bs-toggle="tooltip" data-bs-title="degraded"></div>
  <div class="tracking-block bg-danger" data-bs-toggle="tooltip" data-bs-title="downtime"></div>
  <div class="tracking-block bg-success" data-bs-toggle="tooltip" data-bs-title="operational"></div>
</div>`,
      },
    ],
  },
  {
    slug: "page-header",
    name: "Page headers",
    description: "Standard page header with pretitle, title and action buttons.",
    docsUrl: `${D}/layout/page-headers`,
    snippets: [
      {
        title: "Page header",
        html: `<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <div class="page-pretitle">Overview</div>
        <h2 class="page-title">Dashboard</h2>
      </div>
      <div class="col-auto ms-auto d-print-none">
        <div class="btn-list">
          <a href="#" class="btn btn-primary d-none d-sm-inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
            Create new report
          </a>
        </div>
      </div>
    </div>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "forms",
    name: "Form elements",
    description:
      "Inputs, selects, checkboxes, switches, input groups, hints and required labels.",
    docsUrl: `${D}/forms/form-elements`,
    snippets: [
      {
        title: "Text input with label and hint",
        html: `<div class="mb-3">
  <label class="form-label required">Email address</label>
  <input type="email" class="form-control" name="email" placeholder="Enter email" />
  <small class="form-hint">We'll never share your email with anyone else.</small>
</div>`,
      },
      {
        title: "Select, textarea",
        html: `<div class="mb-3">
  <label class="form-label">Select</label>
  <select class="form-select">
    <option value="1" selected>Option 1</option>
    <option value="2">Option 2</option>
  </select>
</div>
<div class="mb-3">
  <label class="form-label">Textarea</label>
  <textarea class="form-control" rows="3" placeholder="Content.."></textarea>
</div>`,
      },
      {
        title: "Checkboxes, radios, switches",
        html: `<label class="form-check">
  <input class="form-check-input" type="checkbox" checked />
  <span class="form-check-label">Remember me</span>
</label>
<label class="form-check">
  <input class="form-check-input" type="radio" name="radios" checked />
  <span class="form-check-label">Option A</span>
</label>
<label class="form-check form-switch">
  <input class="form-check-input" type="checkbox" checked />
  <span class="form-check-label">Enable notifications</span>
</label>`,
      },
      {
        title: "Input group",
        html: `<div class="input-group mb-2">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username" autocomplete="off" />
  <button class="btn" type="button">Check</button>
</div>`,
      },
      {
        title: "Input with inline icon",
        html: `<div class="input-icon mb-3">
  <span class="input-icon-addon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
  </span>
  <input type="text" class="form-control" placeholder="Search…" />
</div>`,
      },
    ],
  },
  {
    slug: "form-validation",
    name: "Form validation states",
    description: "Valid/invalid input states with feedback messages.",
    docsUrl: `${D}/forms/validation-states`,
    snippets: [
      {
        title: "Validation states",
        html: `<div class="mb-3">
  <label class="form-label">Valid input</label>
  <input type="text" class="form-control is-valid" value="name@example.com" />
  <div class="valid-feedback">Looks good!</div>
</div>
<div class="mb-3">
  <label class="form-label">Invalid input</label>
  <input type="text" class="form-control is-invalid" value="not-an-email" />
  <div class="invalid-feedback">Please provide a valid email.</div>
</div>`,
      },
    ],
  },
  {
    slug: "form-selectgroup",
    name: "Select group (button checkboxes)",
    description: "Checkbox/radio groups styled as buttons or pills.",
    docsUrl: `${D}/forms/select-group`,
    snippets: [
      {
        title: "Select group",
        html: `<div class="form-selectgroup">
  <label class="form-selectgroup-item">
    <input type="checkbox" name="skills" value="HTML" class="form-selectgroup-input" checked />
    <span class="form-selectgroup-label">HTML</span>
  </label>
  <label class="form-selectgroup-item">
    <input type="checkbox" name="skills" value="CSS" class="form-selectgroup-input" />
    <span class="form-selectgroup-label">CSS</span>
  </label>
  <label class="form-selectgroup-item">
    <input type="checkbox" name="skills" value="JS" class="form-selectgroup-input" />
    <span class="form-selectgroup-label">JavaScript</span>
  </label>
</div>`,
      },
    ],
  },
  {
    slug: "form-colorinput",
    name: "Color check input",
    description: "Radio/checkbox rendered as selectable color swatches.",
    docsUrl: `${D}/forms/color-check`,
    snippets: [
      {
        title: "Color input",
        html: `<div class="row g-2">
  <div class="col-auto">
    <label class="form-colorinput">
      <input name="color" type="radio" value="blue" class="form-colorinput-input" checked />
      <span class="form-colorinput-color bg-blue"></span>
    </label>
  </div>
  <div class="col-auto">
    <label class="form-colorinput">
      <input name="color" type="radio" value="red" class="form-colorinput-input" />
      <span class="form-colorinput-color bg-red"></span>
    </label>
  </div>
  <div class="col-auto">
    <label class="form-colorinput">
      <input name="color" type="radio" value="green" class="form-colorinput-input" />
      <span class="form-colorinput-color bg-green"></span>
    </label>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "form-imagecheck",
    name: "Image check input",
    description: "Checkbox/radio rendered as selectable images.",
    docsUrl: `${D}/forms/image-check`,
    snippets: [
      {
        title: "Image check",
        html: `<div class="row g-2">
  <div class="col-6 col-sm-4">
    <label class="form-imagecheck mb-2">
      <input name="form-imagecheck" type="checkbox" value="1" class="form-imagecheck-input" checked />
      <span class="form-imagecheck-figure">
        <img src="./static/photos/photo-1.jpg" alt="" class="form-imagecheck-image" />
      </span>
    </label>
  </div>
  <div class="col-6 col-sm-4">
    <label class="form-imagecheck mb-2">
      <input name="form-imagecheck" type="checkbox" value="2" class="form-imagecheck-input" />
      <span class="form-imagecheck-figure">
        <img src="./static/photos/photo-2.jpg" alt="" class="form-imagecheck-image" />
      </span>
    </label>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "navbar",
    name: "Navbars",
    description:
      "Top and side navigation bars. Use the get_page_layout tool for complete page skeletons with navbars wired in.",
    docsUrl: `${D}/layout/navbars`,
    snippets: [
      {
        title: "Horizontal navbar (structure)",
        html: `<header class="navbar navbar-expand-md d-print-none">
  <div class="container-xl">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
      <a href="." aria-label="Tabler">Brand</a>
    </div>
    <div class="collapse navbar-collapse" id="navbar-menu">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#"><span class="nav-link-title">Home</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><span class="nav-link-title">Reports</span></a>
        </li>
      </ul>
    </div>
  </div>
</header>`,
      },
    ],
  },
  {
    slug: "flag",
    name: "Flags (plugin)",
    description: "Country flags as CSS sprites — requires the tabler-flags plugin stylesheet.",
    docsUrl: `${D}/plugins/flags`,
    requires: ["tabler-flags.min.css"],
    snippets: [
      {
        title: "Flags",
        html: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/css/tabler-flags.min.css" />
<span class="flag flag-country-fr"></span>
<span class="flag flag-country-us flag-md"></span>
<span class="flag flag-country-de flag-lg"></span>`,
      },
    ],
  },
  {
    slug: "payment",
    name: "Payment icons (plugin)",
    description: "Payment provider logos — requires the tabler-payments plugin stylesheet.",
    docsUrl: `${D}/plugins/payments`,
    requires: ["tabler-payments.min.css"],
    snippets: [
      {
        title: "Payment icons",
        html: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/css/tabler-payments.min.css" />
<span class="payment payment-provider-visa"></span>
<span class="payment payment-provider-mastercard payment-md"></span>
<span class="payment payment-provider-paypal payment-lg"></span>`,
      },
    ],
  },
  {
    slug: "social",
    name: "Social icons (plugin)",
    description: "Social network brand icons — requires the tabler-socials plugin stylesheet.",
    docsUrl: `${D}/plugins/social-icons`,
    requires: ["tabler-socials.min.css"],
    snippets: [
      {
        title: "Social icons",
        html: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/css/tabler-socials.min.css" />
<span class="social social-provider-github"></span>
<span class="social social-provider-x social-md"></span>
<span class="social social-provider-linkedin social-lg"></span>`,
      },
    ],
  },
  {
    slug: "dropzone",
    name: "Dropzone (file upload)",
    description: "Drag-and-drop file upload area using the Dropzone.js library.",
    docsUrl: `${D}/components/dropzone`,
    requires: ["Dropzone.js: https://cdn.jsdelivr.net/npm/dropzone@6/dist/dropzone-min.js", "tabler-vendors.min.css"],
    snippets: [
      {
        title: "Dropzone",
        html: `<form class="dropzone" id="dropzone-default" action="./upload" autocomplete="off" novalidate>
  <div class="fallback">
    <input name="file" type="file" />
  </div>
  <div class="dz-message">
    <h3 class="dropzone-msg-title">Drop files here or click to upload</h3>
    <div class="dropzone-msg-desc text-secondary">Upload up to 10 files</div>
  </div>
</form>`,
      },
    ],
  },
  {
    slug: "range-slider",
    name: "Range slider",
    description: "Advanced range sliders using the noUiSlider library.",
    docsUrl: `${D}/components/range-slider`,
    requires: ["noUiSlider: https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.js", "tabler-vendors.min.css"],
    snippets: [
      {
        title: "Range slider container",
        html: `<div class="mb-3">
  <label class="form-label">Range slider</label>
  <div id="range-simple"></div>
</div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    noUiSlider.create(document.getElementById("range-simple"), {
      start: 40,
      connect: [true, false],
      step: 10,
      range: { min: 0, max: 100 },
    });
  });
</script>`,
      },
    ],
  },
  {
    slug: "autosize",
    name: "Autosize textarea",
    description: "Textarea that grows with its content (autosize library).",
    docsUrl: `${D}/components/autosize`,
    requires: ["autosize: https://cdn.jsdelivr.net/npm/autosize@6/dist/autosize.min.js"],
    snippets: [
      {
        title: "Autosize textarea",
        html: `<textarea class="form-control" data-bs-toggle="autosize" placeholder="Type something…"></textarea>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    autosize(document.querySelectorAll('[data-bs-toggle="autosize"]'));
  });
</script>`,
      },
    ],
  },
  {
    slug: "countup",
    name: "Countup",
    description: "Animated number counter (countUp.js).",
    docsUrl: `${D}/components/countup`,
    requires: ["countUp.js: https://cdn.jsdelivr.net/npm/countup.js@2/dist/countUp.umd.min.js"],
    snippets: [
      {
        title: "Countup value",
        html: `<h1><span id="count-up-1">0</span>+</h1>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    new countUp.CountUp("count-up-1", 1500, { duration: 2 }).start();
  });
</script>`,
      },
    ],
  },
  {
    slug: "vector-map",
    name: "Vector maps",
    description: "Interactive SVG world/region maps using jsVectorMap.",
    docsUrl: `${D}/components/vector-maps`,
    requires: [
      "jsVectorMap: https://cdn.jsdelivr.net/npm/jsvectormap@1/dist/jsvectormap.min.js",
      "World map data: https://cdn.jsdelivr.net/npm/jsvectormap@1/dist/maps/world.js",
    ],
    snippets: [
      {
        title: "World map",
        html: `<div class="card">
  <div class="card-body">
    <div id="map-world" class="w-100 h-100" style="height: 300px"></div>
  </div>
</div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    new jsVectorMap({ selector: "#map-world", map: "world" });
  });
</script>`,
      },
    ],
  },
];

export function findComponent(slug: string): TablerComponent | undefined {
  const s = slug.trim().toLowerCase().replace(/\s+/g, "-");
  return (
    components.find((c) => c.slug === s) ??
    components.find((c) => c.name.toLowerCase() === slug.trim().toLowerCase()) ??
    components.find((c) => c.slug.includes(s) || s.includes(c.slug))
  );
}

export function searchComponents(query?: string): TablerComponent[] {
  if (!query) return components;
  const q = query.trim().toLowerCase();
  return components.filter(
    (c) =>
      c.slug.includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  );
}
