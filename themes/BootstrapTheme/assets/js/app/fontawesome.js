// FontAwesome Icons
// Import icons one by one to reduce size of the output
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faArchive } from '@fortawesome/free-solid-svg-icons/faArchive';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons/faShareFromSquare';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';

library.add(faArchive, faShareFromSquare, faTrash, faClose, faBars, faHeart);
dom.watch();
