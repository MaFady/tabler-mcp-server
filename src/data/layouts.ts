/**
 * Full-page layout skeletons for Tabler 1.4.x, matching preview.tabler.io layouts.
 * Placeholders: {{TITLE}}, {{CSS}}, {{JS}}, {{THEME_ATTR}} are filled by the
 * get_page_layout / get_starter_template tools.
 */

export interface TablerLayout {
  slug: string;
  name: string;
  description: string;
  /** Body content only (inside <body>...</body>). */
  body: string;
}

const NAVBAR_HORIZONTAL = `<header class="navbar navbar-expand-md d-print-none">
      <div class="container-xl">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href=".">{{TITLE}}</a>
        </div>
        <div class="navbar-nav flex-row order-md-last">
          <div class="nav-item dropdown">
            <a href="#" class="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown" aria-label="Open user menu">
              <span class="avatar avatar-sm">JD</span>
              <div class="d-none d-xl-block ps-2">
                <div>Jane Doe</div>
                <div class="mt-1 small text-secondary">Administrator</div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a href="#" class="dropdown-item">Profile</a>
              <a href="#" class="dropdown-item">Settings</a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">Logout</a>
            </div>
          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbar-menu">
          <div class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#"><span class="nav-link-title">Home</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><span class="nav-link-title">Reports</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><span class="nav-link-title">Settings</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>`;

const PAGE_CONTENT = `<div class="page-wrapper">
      <!-- Page header -->
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <div class="page-pretitle">Overview</div>
              <h2 class="page-title">{{TITLE}}</h2>
            </div>
            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a href="#" class="btn btn-primary d-none d-sm-inline-block">New item</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Page body -->
      <div class="page-body">
        <div class="container-xl">
          <div class="row row-deck row-cards">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">Your content here</h3>
                  <p class="text-secondary">Replace this card with your page content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <footer class="footer footer-transparent d-print-none">
        <div class="container-xl">
          <div class="row text-center align-items-center flex-row-reverse">
            <div class="col-12 col-lg-auto mt-3 mt-lg-0">
              <ul class="list-inline list-inline-dots mb-0">
                <li class="list-inline-item">Copyright &copy; 2026 {{TITLE}}. All rights reserved.</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>`;

export const layouts: TablerLayout[] = [
  {
    slug: "horizontal",
    name: "Horizontal layout (top navbar)",
    description:
      "Default Tabler layout: horizontal top navbar, page header, body and footer.",
    body: `<div class="page">
    ${NAVBAR_HORIZONTAL}
    ${PAGE_CONTENT}
  </div>`,
  },
  {
    slug: "vertical",
    name: "Vertical layout (sidebar)",
    description: "Dark vertical sidebar navigation on the left, content on the right.",
    body: `<div class="page">
    <!-- Sidebar -->
    <aside class="navbar navbar-vertical navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu" aria-controls="sidebar-menu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-brand navbar-brand-autodark">
          <a href=".">{{TITLE}}</a>
        </div>
        <div class="collapse navbar-collapse" id="sidebar-menu">
          <ul class="navbar-nav pt-lg-3">
            <li class="nav-item active">
              <a class="nav-link" href="#"><span class="nav-link-title">Home</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><span class="nav-link-title">Reports</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><span class="nav-link-title">Settings</span></a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    ${PAGE_CONTENT}
  </div>`,
  },
  {
    slug: "condensed",
    name: "Condensed layout",
    description: "Single condensed header combining brand, navigation and user menu.",
    body: `<div class="page">
    <header class="navbar navbar-expand-md navbar-overlap d-print-none">
      <div class="container-xl">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href=".">{{TITLE}}</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-menu">
          <ul class="navbar-nav">
            <li class="nav-item active"><a class="nav-link" href="#"><span class="nav-link-title">Home</span></a></li>
            <li class="nav-item"><a class="nav-link" href="#"><span class="nav-link-title">Reports</span></a></li>
          </ul>
        </div>
      </div>
    </header>
    ${PAGE_CONTENT}
  </div>`,
  },
  {
    slug: "fluid",
    name: "Fluid layout",
    description: "Full-width layout using container-fluid instead of container-xl.",
    body: `<div class="page">
    ${NAVBAR_HORIZONTAL.replace(/container-xl/g, "container-fluid")}
    ${PAGE_CONTENT.replace(/container-xl/g, "container-fluid")}
  </div>`,
  },
  {
    slug: "login",
    name: "Sign-in page",
    description: "Centered login card with email/password, remember me and links.",
    body: `<div class="page page-center">
    <div class="container container-tight py-4">
      <div class="text-center mb-4">
        <a href="." class="navbar-brand navbar-brand-autodark">{{TITLE}}</a>
      </div>
      <div class="card card-md">
        <div class="card-body">
          <h2 class="h2 text-center mb-4">Login to your account</h2>
          <form action="./" method="get" autocomplete="off" novalidate>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" placeholder="your@email.com" autocomplete="off" />
            </div>
            <div class="mb-2">
              <label class="form-label">
                Password
                <span class="form-label-description"><a href="./forgot-password.html">I forgot password</a></span>
              </label>
              <input type="password" class="form-control" placeholder="Your password" autocomplete="off" />
            </div>
            <div class="mb-2">
              <label class="form-check">
                <input type="checkbox" class="form-check-input" />
                <span class="form-check-label">Remember me on this device</span>
              </label>
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">Sign in</button>
            </div>
          </form>
        </div>
      </div>
      <div class="text-center text-secondary mt-3">
        Don't have account yet? <a href="./sign-up.html" tabindex="-1">Sign up</a>
      </div>
    </div>
  </div>`,
  },
  {
    slug: "register",
    name: "Sign-up page",
    description: "Centered registration card with name, email, password and terms.",
    body: `<div class="page page-center">
    <div class="container container-tight py-4">
      <div class="text-center mb-4">
        <a href="." class="navbar-brand navbar-brand-autodark">{{TITLE}}</a>
      </div>
      <div class="card card-md">
        <div class="card-body">
          <h2 class="h2 text-center mb-4">Create new account</h2>
          <form action="./" method="get" autocomplete="off" novalidate>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" placeholder="Enter name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" placeholder="Enter email" />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" placeholder="Password" autocomplete="off" />
            </div>
            <div class="mb-3">
              <label class="form-check">
                <input type="checkbox" class="form-check-input" />
                <span class="form-check-label">Agree to the <a href="./terms-of-service.html" tabindex="-1">terms and policy</a>.</span>
              </label>
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">Create new account</button>
            </div>
          </form>
        </div>
      </div>
      <div class="text-center text-secondary mt-3">
        Already have account? <a href="./sign-in.html" tabindex="-1">Sign in</a>
      </div>
    </div>
  </div>`,
  },
  {
    slug: "forgot-password",
    name: "Forgot password page",
    description: "Centered card asking for the account email to send a reset link.",
    body: `<div class="page page-center">
    <div class="container container-tight py-4">
      <div class="text-center mb-4">
        <a href="." class="navbar-brand navbar-brand-autodark">{{TITLE}}</a>
      </div>
      <div class="card card-md">
        <div class="card-body">
          <h2 class="h2 text-center mb-4">Forgot password</h2>
          <p class="text-secondary mb-4">Enter your email address and your password will be reset and emailed to you.</p>
          <form action="./" method="get" autocomplete="off" novalidate>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" placeholder="Enter email" />
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">Send me new password</button>
            </div>
          </form>
        </div>
      </div>
      <div class="text-center text-secondary mt-3">
        Forget it, <a href="./sign-in.html">send me back</a> to the sign in screen.
      </div>
    </div>
  </div>`,
  },
  {
    slug: "error-404",
    name: "404 error page",
    description: "Centered 404 page with message and back-home button.",
    body: `<div class="page page-center">
    <div class="container-tight py-4">
      <div class="empty">
        <div class="empty-header">404</div>
        <p class="empty-title">Oops… You just found an error page</p>
        <p class="empty-subtitle text-secondary">We are sorry but the page you are looking for was not found</p>
        <div class="empty-action">
          <a href="." class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2"><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
            Take me home
          </a>
        </div>
      </div>
    </div>
  </div>`,
  },
  {
    slug: "error-500",
    name: "500 error page",
    description: "Centered 500 page for server errors.",
    body: `<div class="page page-center">
    <div class="container-tight py-4">
      <div class="empty">
        <div class="empty-header">500</div>
        <p class="empty-title">Oops… Something went wrong</p>
        <p class="empty-subtitle text-secondary">We are sorry but our server encountered an internal error</p>
        <div class="empty-action">
          <a href="." class="btn btn-primary">Take me home</a>
        </div>
      </div>
    </div>
  </div>`,
  },
  {
    slug: "blank",
    name: "Blank page",
    description: "Minimal page wrapper with an empty container — a clean starting point.",
    body: `<div class="page">
    <div class="page-wrapper">
      <div class="page-body">
        <div class="container-xl">
          <!-- Your content here -->
        </div>
      </div>
    </div>
  </div>`,
  },
];

export function findLayout(slug: string): TablerLayout | undefined {
  const s = slug.trim().toLowerCase().replace(/\s+/g, "-");
  return layouts.find((l) => l.slug === s) ?? layouts.find((l) => l.slug.includes(s));
}
