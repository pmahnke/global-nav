import { canonicalProducts, canonicalLogins } from './product-details';

function createFromHTML(html) {
  const div = window.document.createElement('div'); //eslint-disable-line
  div.innerHTML = html;
  return div.childNodes[0];
}

function createMobileDropdown(products) {
  const { flagships, others, resources, abouts } = products;

  function createListItem(obj) {
    return `<li class="global-nav__list-item">
        <a class="global-nav__link" href=${obj.url}>${obj.title}</a>
      </li>`;
  }

  const mobileFlagships = flagships
    .map(flagship => createListItem(flagship))
    .join('');

  const mobileOthers = others.map(other => createListItem(other)).join('');

  const mobileResources = resources
    .map(resource => createListItem(resource))
    .join('');

  const mobileAbouts = abouts.map(about => createListItem(about)).join('');

  const mobileDropdown = `<div class="global-nav__mobile-strip">
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav__expanding-row">Products</h5>
        <ul class="global-nav__split-list">
          ${mobileFlagships}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav__expanding-row">Other websites</h5>
        <ul class="global-nav__split-list">
          ${mobileOthers}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav__expanding-row">Resources</h5>
        <ul class="global-nav__split-list">
          ${mobileResources}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav__expanding-row">About</h5>
        <ul class="global-nav__split-list u-no-margin--bottom">
          ${mobileAbouts}
        </ul>
      </div>
    </div>`;

  return mobileDropdown;
}

function createProductDropdown(products) {
  const { flagships, others, resources, abouts } = products;

  const productFlagships = flagships
    .map((flagship, index) => {
      let flagshipMarkup = `<li class="global-nav__matrix-item">
          <a class="global-nav__link" href=${flagship.url}>
            <img class="global-nav__matrix-image" src=${
              flagship.logoUrl
            } alt="icon">
            <h4 class="global-nav__matrix-title">${flagship.title}</h4>
          </a>
          <div class="global-nav__matrix-content">
            <p class="global-nav__matrix-desc">${flagship.description}</p>
          </div>
        </li>`;

      // Check whether to add extra empty matrix items
      if (index === flagships.length - 1) {
        const extraMatrixCount = (2 * flagships.length) % 3;
        for (let i = 0; i < extraMatrixCount; i += 1) {
          flagshipMarkup += `<li class="global-nav__matrix-item">
              &nbsp;
            </li>`;
        }
      }

      return flagshipMarkup;
    })
    .join('');

  const productOthers = others
    .map((other, index) => {
      let otherMarkup = `<li class="global-nav__matrix-item">
          <div class="global-nav__matrix-content">
            <h4 class="global-nav__matrix-title"><a class="global-nav__link" href=${
              other.url
            }>${other.title}&nbsp;›</a></h4>
            <p class="global-nav__matrix-desc u-no-margin--left">${
              other.description
            }</p>
          </div>
        </li>`;

      // Check whether to add extra empty matrix items
      if (index === others.length - 1) {
        const extraMatrixCount = (2 * others.length) % 3;
        for (let i = 0; i < extraMatrixCount; i += 1) {
          otherMarkup += `<li class="global-nav__matrix-item">
              &nbsp;
            </li>`;
        }
      }

      return otherMarkup;
    })
    .join('');

  const productResources = resources
    .map(resource => {
      const resourceMarkup = `<li class="global-nav__list-item">
          <a class="global-nav__link" href=${resource.url} title="Visit ${
        resource.title
      }">${resource.title}</a>
        </li>`;
      return resourceMarkup;
    })
    .join('');

  const productAbouts = abouts
    .map(about => {
      const aboutMarkup = `<li class="global-nav__list-item">
          <a class="global-nav__link" href=${about.url}>${about.title}</a>
        </li>`;
      return aboutMarkup;
    })
    .join('');

  const mobileDropdown = createMobileDropdown(products);

  const productDropdown = `${mobileDropdown}
    <div class="global-nav__strip u-hide--mobile">
      <div class="global-nav__row is-bordered">
        <ul class="global-nav__matrix">
          ${productFlagships}
        </ul>
      </div>
    </div>
    <div class="global-nav__strip u-hide--mobile">
      <div class="global-nav__row">
        <div class="global-nav__flex-container">
          <div class="global-nav__others-col">
            <h5 class="global-nav__muted-heading">Other websites</h5>
            <div class="global-nav__matrix">
              ${productOthers}
            </div>
          </div>
          <div class="global-nav__resources-col">
            <h5 class="global-nav__muted-heading">Resources</h5>
            <ul class="global-nav__split-list">
              ${productResources}
            </ul>
            <h5 class="global-nav__muted-heading">About</h5>
            <ul class="global-nav__split-list">
              ${productAbouts}
            </ul>
          </div>
        </div>
      </div>
    </div>`;

  return productDropdown;
}

function createLoginDropdown(logins) {
  const loginItems = logins
    .map(loginItem => {
      const loginItemMarkup = `<li class="global-nav__matrix-item">
          <a class="global-nav__link" href=${loginItem.login}>
            <img class="global-nav__matrix-image" src=${
              loginItem.logoUrl
            } alt="">
            <h4 class="global-nav__matrix-title">${loginItem.title}</h4>
          </a>
          <div class="global-nav__matrix-content">
            <p class="global-nav__matrix-desc">${loginItem.description}</p>
            <ul class="global-nav__inline-list">
              <li class="global-nav__list-item">
                <a class="global-nav__link" href=${
                  loginItem.login
                }>Login&nbsp;&rsaquo;</a>
              </li>
              ${
                loginItem.signup
                  ? `<li class="global-nav__list-item">
                <a class="global-nav__link" href=${
                  loginItem.signup
                }>Sign up&nbsp;&rsaquo;</a>
              </li>`
                  : ''
              }
            </ul>
          </div>
        </li>`;
      return loginItemMarkup;
    })
    .join('');

  const loginDropdown = `<div class="global-nav__strip">
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading">Customer portals</h5>
      </div>
      <div class="global-nav__row">
        <ul class="global-nav__matrix">
          ${loginItems}
        </ul>
      </div>
    </div>`;

  return loginDropdown;
}

function addListeners(breakpoint, wrapper) {
  const headerLinks = wrapper.querySelectorAll('.global-nav__header-link');
  const dropdownContainer = wrapper.querySelector('.global-nav__dropdown');
  const dropdownContents = wrapper.querySelectorAll(
    '.global-nav__dropdown-content'
  );
  const expandingRows = wrapper.querySelectorAll('.global-nav__expanding-row');
  const overlay = wrapper.querySelector('.global-nav__overlay');
  const isMobile = window.innerWidth < breakpoint; //eslint-disable-line

  function closeNav() {
    dropdownContainer.classList.remove('show-content');
    headerLinks.forEach(link => link.classList.remove('is-selected'));
    overlay.classList.remove('show-overlay');
  }

  function scrollGlobalNavToTop() {
    window.scrollTo(0, wrapper.offsetTop); //eslint-disable-line
  }

  function openDropdown(headerLink) {
    const targetMenuLink = headerLink.querySelector(
      '.global-nav__header-link-anchor'
    );
    const targetMenuId = targetMenuLink.getAttribute('href');
    const targetMenu = wrapper.querySelector(targetMenuId);

    headerLink.classList.add('is-selected');
    dropdownContents.forEach(
      menu => menu !== targetMenu && menu.classList.add('u-hide')
    );
    targetMenu.classList.remove('u-hide');
    overlay.classList.add('show-overlay');

    if (isMobile) {
      scrollGlobalNavToTop();
    }
  }

  headerLinks.forEach(headerLink => {
    headerLink.addEventListener('click', e => {
      e.preventDefault();

      if (dropdownContainer.classList.contains('show-content')) {
        if (headerLink.classList.contains('is-selected')) {
          closeNav();
        } else {
          headerLinks.forEach(link => link.classList.remove('is-selected'));
          openDropdown(headerLink);
        }
      } else {
        dropdownContainer.classList.add('show-content');
        openDropdown(headerLink);
      }
    });
  });

  expandingRows.forEach(expandingRow => {
    expandingRow.addEventListener('click', e => {
      e.target.classList.toggle('is-active');
      scrollGlobalNavToTop();
    });
  });

  overlay.addEventListener('click', closeNav);
}

export const createNav = ({ maxWidth = '68rem', showLogins = true } = {}) => {
  // Recruitment call to action
  console.log(
    'Interested in what makes us tick? Then we are interested in you! See our jobs page for more info: http://ubunt.eu/dev-jobs'
  ); //eslint-disable-line

  // Build global nav components
  const wrapper = createFromHTML(
    '<div id="canonical-global-nav" class="global-nav"></div>'
  );
  const overlay = createFromHTML('<div class="global-nav__overlay"></div>');
  let loginsHTML = '';
  let loginsLink = '';

  if (showLogins) {
    loginsLink = [
      '<li class="global-nav__header-link">',
      '  <a class="global-nav__header-link-anchor" href="#canonical-login">Login</a>',
      '</li>',
    ].join('\n');

    loginsHTML = [
      `<div class="global-nav__dropdown-content u-hide" id="canonical-login" style="max-width:${maxWidth}">`,
      `  ${createLoginDropdown(canonicalLogins)}`,
      '</div>',
    ].join('\n');
  }

  const navHeader = createFromHTML(`<div class="global-nav__header">
    <div class="global-nav__header-row global-nav__row" style="max-width:${maxWidth}">
      <div class="global-nav__header-logo">
        <a class="global-nav__header-logo-anchor" href="https://www.canonical.com">
          <svg width="75" height="10"><g fill="#FFF" fill-rule="evenodd"><path d="M4.409 9.79a4.815 4.815 0 0 1-1.799-.323 3.785 3.785 0 0 1-1.393-.951 4.321 4.321 0 0 1-.899-1.53C.106 6.382 0 5.69 0 4.907c0-.782.117-1.476.351-2.083a4.427 4.427 0 0 1 .96-1.53c.4-.41.878-.731 1.407-.946a4.459 4.459 0 0 1 1.69-.323 6.615 6.615 0 0 1 1.921.27c.195.057.385.129.568.216.144.072.243.125.298.161l-.393 1.08a2.099 2.099 0 0 0-.351-.176 6.577 6.577 0 0 0-.535-.189 5.126 5.126 0 0 0-.67-.155 4.704 4.704 0 0 0-.77-.06c-.46 0-.88.085-1.257.256-.377.17-.71.423-.974.742-.27.323-.48.717-.629 1.18-.149.463-.223.982-.223 1.557 0 .558.065 1.066.196 1.524.13.459.329.852.595 1.18.265.328.603.589.987.762.393.18.854.27 1.386.27.596 0 1.09-.063 1.481-.189.393-.126.688-.238.886-.337l.338 1.079a1.87 1.87 0 0 1-.338.169 4.615 4.615 0 0 1-.609.195 7.74 7.74 0 0 1-1.906.23zm8.33-9.548c.325.675.636 1.356.933 2.043.31.718.61 1.44.9 2.165.301.755.61 1.553.926 2.394.315.84.653 1.755 1.014 2.744h-1.433a37.938 37.938 0 0 1-.433-1.2c-.137-.4-.277-.8-.42-1.2H9.98l-.852 2.4H7.762c.333-.916.671-1.831 1.014-2.744.3-.801.609-1.6.926-2.394.29-.726.59-1.447.9-2.165.297-.688.608-1.369.933-2.043h1.204zm-.636 1.497a35.094 35.094 0 0 0-.899 2.104 75.02 75.02 0 0 0-.845 2.28h3.489c-.28-.76-.566-1.518-.859-2.273a40.365 40.365 0 0 0-.886-2.11zm12.158 7.85a75.23 75.23 0 0 0-.683-1.12c-.27-.434-.547-.864-.832-1.288a81.364 81.364 0 0 0-.926-1.356 58.91 58.91 0 0 0-1.873-2.535c-.267-.34-.542-.673-.825-.998v7.296h-1.285V.242h1.041c.473.506.927 1.03 1.36 1.571.489.607.967 1.223 1.433 1.848.473.634.92 1.256 1.339 1.868.368.534.723 1.078 1.061 1.632V.242h1.285v9.346h-1.095zm20.472 0a50.642 50.642 0 0 0-.683-1.12 49.404 49.404 0 0 0-.829-1.288 74.62 74.62 0 0 0-1.88-2.684 53.44 53.44 0 0 0-.92-1.207c-.266-.34-.541-.672-.824-.998v7.296H38.31V.242h1.042c.473.507.926 1.03 1.359 1.571a61.88 61.88 0 0 1 2.772 3.716c.37.533.723 1.077 1.06 1.632V.242h1.285v9.346h-1.096zM48.212.241h1.312v9.346h-1.312V.242zm7.72 9.548a4.83 4.83 0 0 1-1.798-.323 3.794 3.794 0 0 1-1.394-.951 4.374 4.374 0 0 1-.9-1.53c-.212-.603-.318-1.295-.318-2.078 0-.782.118-1.476.354-2.084.235-.606.553-1.117.962-1.53A4.09 4.09 0 0 1 54.243.35a4.449 4.449 0 0 1 1.689-.324 6.55 6.55 0 0 1 1.92.27c.236.072.424.144.57.216.145.072.243.125.298.161l-.393 1.08a2.18 2.18 0 0 0-.353-.176 6.4 6.4 0 0 0-.534-.189 4.955 4.955 0 0 0-1.441-.215c-.46 0-.876.085-1.257.256-.377.17-.71.424-.974.742a3.47 3.47 0 0 0-.628 1.18c-.15.463-.224.982-.224 1.557 0 .558.067 1.066.197 1.524.13.459.33.852.596 1.18.264.329.593.583.986.762.393.18.856.27 1.386.27.597 0 1.088-.063 1.48-.189a6.72 6.72 0 0 0 .888-.337l.338 1.08c-.063.044-.177.1-.338.168a4.687 4.687 0 0 1-.609.195 7.714 7.714 0 0 1-1.912.23h.004zM64.264.242c.322.674.633 1.355.931 2.043.298.688.597 1.41.9 2.165.302.755.612 1.553.926 2.394.314.84.656 1.755 1.013 2.744h-1.433a46.262 46.262 0 0 1-.432-1.2 65.234 65.234 0 0 0-.42-1.2h-4.245l-.852 2.4h-1.367c.362-.989.7-1.903 1.013-2.744a98.141 98.141 0 0 1 1.826-4.559c.299-.688.609-1.369.935-2.043h1.205zm-.636 1.497a32.5 32.5 0 0 0-.899 2.104c-.287.728-.57 1.488-.848 2.28h3.49c-.29-.783-.576-1.54-.86-2.273a39.37 39.37 0 0 0-.883-2.11zM75 8.496v1.092h-5.639V.242h1.312v8.254H75zm-43.165-.479a3.113 3.113 0 0 1-3.118-3.109A3.113 3.113 0 0 1 31.835 1.8a3.113 3.113 0 0 1 3.117 3.108 3.113 3.113 0 0 1-3.117 3.11z"/><path d="M36.73 4.908a4.889 4.889 0 0 1-4.896 4.882 4.889 4.889 0 0 1-4.895-4.882A4.889 4.889 0 0 1 31.834.026a4.89 4.89 0 0 1 4.896 4.882zm-4.895-3.694a3.7 3.7 0 0 0-3.705 3.694 3.7 3.7 0 0 0 3.705 3.695 3.7 3.7 0 0 0 3.704-3.695 3.7 3.7 0 0 0-3.705-3.694z"/></g></svg>
        </a>
      </div>
      <ul class="global-nav__header-list">
        <li class="global-nav__header-link">
          <a class="global-nav__header-link-anchor" href="#canonical-products">Products</a>
        </li>
        ${loginsLink}
      </ul>
    </div>
  </div>`);

  const navDropdown = createFromHTML(
    `<div class="global-nav__dropdown">
      <div class="global-nav__dropdown-content u-hide" id="canonical-products" style="max-width:${maxWidth}">
        ${createProductDropdown(canonicalProducts)}
      </div>
      ${loginsHTML}
    </div>`
  );

  // Attach to the DOM
  document.body.insertBefore(wrapper, document.body.firstElementChild); //eslint-disable-line
  wrapper.appendChild(navHeader);
  wrapper.appendChild(navDropdown);
  wrapper.appendChild(overlay);

  // Add event listeners
  addListeners(900, wrapper);
};
