import { useEffect, useState } from 'react'
import {
  AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card, CardContent,
  CssBaseline, ThemeProvider, createTheme, TextField, Stack, Avatar, Fab, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemIcon, ListItemText, CardActionArea, IconButton, Link, Divider, Tabs, Tab, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper,
} from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SpaIcon from '@mui/icons-material/Spa'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import PhoneIcon from '@mui/icons-material/Phone'
import PlaceIcon from '@mui/icons-material/Place'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import EmailIcon from '@mui/icons-material/Email'

// Spice-pigment palette: cardamom green ink, turmeric field, chilli for rare emphasis.
const theme = createTheme({
  palette: {
    primary: { main: '#1F4D3A' },
    secondary: { main: '#F0A818', contrastText: '#1F4D3A' },
    error: { main: '#C4281C' },
    background: { default: '#FFFFFF' },
    text: { primary: '#1F2A24' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { overflow: 'hidden', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 28px rgba(31,77,58,.15)' } } },
    },
    MuiButton: { styleOverrides: { root: { borderRadius: 999 } } },
  },
  typography: {
    fontFamily: '"Figtree", "Roboto", sans-serif',
    h2: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05 },
    h4: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 800, letterSpacing: '-0.01em' },
    h5: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 800 },
    h6: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
})

// Placeholder content: kainchifoodproducts.in is a parked page, so replace with real details.
// Placeholder number: country code + number, no + or spaces.
const WHATSAPP = '910000000000'
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
const WA_LINK = waLink('Hello Kainchi Food Products, I would like to enquire about your spice powders.')
const NAV = ['Home', 'About', 'Products', 'Gallery', 'Contact']
const PRODUCTS = [
  ['Turmeric Powder', 'Dehydrated, finely ground haldi with deep golden colour and 3%+ curcumin. Sizes: 100g, 500g, 1kg, bulk.', '/photos/turmeric.jpg'],
  ['Red Chilli Powder', 'Sun-dried and dehydrated chillies, ground fine. Mild (Kashmiri), medium and hot grades.', '/photos/chilli.jpg'],
  ['Coriander Powder', 'Cleaned, dehydrated coriander seed ground fresh for strong aroma. Sizes: 100g to bulk.', '/photos/coriander.jpg'],
  ['Cumin Powder', 'Steam-sterilised jeera, low moisture, rich in natural oils.', '/photos/cumin.jpg'],
  ['Black Pepper Powder', 'Bold, pungent pepper from selected berries, 550 g/l grade.', '/photos/pepper.jpg'],
  ['Garam Masala', 'Blend of dehydrated whole spices ground to a warm, balanced mix.', '/photos/garam.jpg'],
]
const QUALITY = [
  ['Sourcing', 'Raw spices are bought only from vetted farms and mandis, with lot records.'],
  ['Cleaning & Sorting', 'Destoning, de-stemming and metal detection remove foreign matter.'],
  ['Dehydration', 'Controlled drying brings moisture below 8% for shelf life and colour.'],
  ['Grinding', 'Cryogenic-style cooled grinding keeps aroma and volatile oils intact.'],
  ['Lab Testing', 'Every batch is checked for moisture, colour, purity and microbial limits.'],
  ['Packing', 'Food-grade, sealed packs with batch codes for full traceability.'],
]
const CONTACT = [
  [<PlaceIcon />, 'Plot 12, Industrial Area, Indore, Madhya Pradesh 452001, India'],
  [<PhoneIcon />, '+91 00000 00000'],
  [<EmailIcon />, 'info@kainchifoodproducts.in'],
]
// Mock data. Every certificate renders a SAMPLE watermark; replace with scans of the real ones.
const CERTIFICATES = [
  ['FSSAI Licence', 'Food Safety and Standards Authority of India', 'Lic. No. 10000000000000', '2025 – 2030'],
  ['ISO 22000:2018', 'Food Safety Management System', 'Cert. No. FS-000000', '2025 – 2028'],
  ['HACCP', 'Hazard Analysis and Critical Control Points', 'Cert. No. HC-000000', '2025 – 2028'],
  ['Spices Board Registration', 'Spices Board India', 'Reg. No. RCMC/SB/0000', '2025 – 2030'],
  ['Halal Certificate', 'Halal certification body', 'Cert. No. HL-000000', '2025 – 2026'],
  ['Import Export Code', 'Directorate General of Foreign Trade', 'IEC 0000000000', 'Lifetime'],
]
// Mock harvest windows (1 = Jan ... 12 = Dec); replace with the real sourcing calendar.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const HARVEST = [
  ['Turmeric', [1, 2, 3, 4]],
  ['Red Chilli', [1, 2, 3, 12]],
  ['Coriander', [2, 3, 4]],
  ['Cumin', [2, 3, 4]],
  ['Black Pepper', [1, 2, 3, 12]],
  ['Mustard Seed', [2, 3]],
  ['Sesame', [9, 10, 11]],
  ['Fenugreek', [3, 4]],
]
const JOBS = [
  ['Quality Control Executive', 'Indore', 'Full time', 'Run batch tests for moisture, colour and purity. B.Sc. in food science or chemistry.'],
  ['Production Supervisor', 'Indore', 'Full time', 'Lead a shift on the grinding and packing lines. 3+ years in food processing.'],
  ['Export Documentation Executive', 'Indore', 'Full time', 'Prepare shipping documents, invoices and certificates for export orders.'],
  ['Sales Executive (Domestic)', 'Indore / Remote', 'Full time', 'Grow dealer and retail accounts across central India.'],
]
const SLIDES = [
  ['Turmeric, ground the day it is dried.', 'Dehydrated spice powders with colour and aroma intact, from our plant in Indore.', '#F0A818', '#1F4D3A', 'Products', 'See the products', '/photos/turmeric.jpg'],
  ['Red chilli with heat you can specify.', 'Mild Kashmiri to hot grades, tested for colour value and moisture on every batch.', '#C4281C', '#FFFFFF', 'About', 'See our quality checks', '/photos/chilli.jpg'],
  ['A plant built for steady supply.', 'Hygienic, high-capacity processing for domestic and export orders.', '#1F4D3A', '#FFFFFF', 'About', 'See the plant', '/photos/garam.jpg'],
]
const STATS = [['25,000 sq ft', 'Plant area'], ['20 MT/day', 'Processing capacity'], ['In-house', 'Quality lab'], ['100%', 'Batch traceability']]
const FACILITIES = [
  ['Cleaning & Sorting Unit', 'Destoners, sieves and metal detectors for clean raw material.'],
  ['Dehydration Section', 'Temperature-controlled dryers for even moisture and colour.'],
  ['Grinding Hall', 'Cooled mills that protect aroma and volatile oils.'],
  ['Quality Laboratory', 'Moisture, colour, purity and microbial testing on site.'],
  ['Packing Line', 'Sealed, food-grade packing with batch coding.'],
  ['Cold & Dry Storage', 'Clean, pest-controlled warehousing for raw and finished goods.'],
]
// Placeholder profile URLs; replace with the real accounts.
const SOCIALS = [
  ['Facebook', <FacebookIcon />, 'https://facebook.com/kainchifoodproducts'],
  ['Instagram', <InstagramIcon />, 'https://instagram.com/kainchifoodproducts'],
  ['LinkedIn', <LinkedInIcon />, 'https://linkedin.com/company/kainchifoodproducts'],
  ['YouTube', <YouTubeIcon />, 'https://youtube.com/@kainchifoodproducts'],
  ['WhatsApp', <WhatsAppIcon />, WA_LINK],
]
// Photos from Wikimedia Commons; the CC BY / BY-SA licences require this credit.
const CREDITS = [
  ['Turmeric', 'Herusutimbul', 'CC BY-SA 4.0'],
  ['Red chilli', 'Ajay Suresh', 'CC BY 2.0'],
  ['Coriander', 'Gaurav Dhwaj Khadka', 'CC BY-SA 4.0'],
  ['Cumin', 'Misterneedlemouse', 'CC0'],
  ['Black pepper', 'Eliška Jindříšková', 'CC BY-SA 4.0'],
  ['Garam masala', 'Miansari66', 'Public domain'],
]
// Mock copy, kept to flavour and culinary use; have any health claims checked against FSSAI rules before adding them.
const BENEFITS = {
  'Turmeric Powder': ['Deep golden colour for curries, rice and marinades', 'Warm, earthy flavour with mild bitterness', 'Traditionally used in Indian home cooking and festivals', 'Fine grind blends smoothly without lumps'],
  'Red Chilli Powder': ['Bright red colour with adjustable heat levels', 'Mild Kashmiri grade for colour without strong heat', 'Even grind for gravies, pickles and tadka', 'Low moisture for a longer shelf life'],
  'Coriander Powder': ['Fresh citrusy aroma that lifts any gravy', 'Thickens curries lightly as it cooks', 'Pairs with cumin and turmeric in everyday masalas', 'Ground from cleaned, sorted seed'],
  'Cumin Powder': ['Smoky, nutty flavour for dals, raitas and rice', 'Strong aroma from natural oils', 'Works raw in chaats and roasted in curries', 'Ground from cleaned, sorted jeera'],
  'Black Pepper Powder': ['Sharp, lasting heat with a woody aroma', 'Seasons soups, eggs, salads and marinades', 'Bold berries ground fresh and packed sealed', 'A little goes a long way'],
  'Garam Masala': ['Balanced warm blend of whole spices', 'Added at the end of cooking for aroma', 'Ready to use, so no measuring of many spices', 'Consistent taste in every batch'],
}
const WHY = [
  [<VerifiedIcon fontSize="large" />, 'Quality Assured', 'Every batch is tested before it ships.'],
  [<SpaIcon fontSize="large" />, 'Farm Fresh', 'Sourced directly from trusted growers.'],
  [<LocalShippingIcon fontSize="large" />, 'Reliable Supply', 'On-time delivery, domestic and export.'],
]

const Photo = ({ src, label, sx }) => (
  <Box component="img" src={src} alt={label} loading="lazy"
    sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', ...sx }} />
)

const HeroSlider = ({ go }) => {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [i])
  const [title, sub, bg, fg, target, cta, photo] = SLIDES[i]
  return (
    <Box sx={{ bgcolor: bg, color: fg, py: { xs: 6, md: 10 }, transition: 'background-color .6s, color .6s' }}>
      <Container>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2.4rem', md: '4rem' } }}>{title}</Typography>
            <Typography sx={{ mt: 2, mb: 4, fontSize: '1.15rem', maxWidth: '36ch' }}>{sub}</Typography>
            <Button variant="contained" size="large" onClick={() => go(target)}
              sx={{ bgcolor: fg, color: bg, '&:hover': { bgcolor: fg, opacity: 0.9 } }}>{cta}</Button>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Photo src={photo} label="Spice powder" sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
          {SLIDES.map((_, n) => (
            <Box key={n} component="button" aria-label={`Slide ${n + 1}`} onClick={() => setI(n)}
              sx={{ width: 28, height: 6, p: 0, border: 0, borderRadius: 3, cursor: 'pointer', bgcolor: fg, opacity: n === i ? 1 : 0.35,
                '&:focus-visible': { outline: `2px solid ${fg}`, outlineOffset: 3 } }} />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

const Certificate = ({ title, issuer, no, valid }) => (
  <Box sx={{ position: 'relative', p: 3, textAlign: 'center', bgcolor: '#FFFDF4', border: '6px double', borderColor: 'secondary.main', borderRadius: 1, height: '100%', overflow: 'hidden' }}>
    <Box component="img" src="/logo.svg" alt="" sx={{ height: 36 }} />
    <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Certificate of</Typography>
    <Typography variant="h6" color="primary">{title}</Typography>
    <Typography variant="body2" sx={{ my: 1 }}>Issued to Kainchi Food Products by {issuer}</Typography>
    <Typography variant="body2" color="text.secondary">{no}</Typography>
    <Typography variant="body2" color="text.secondary">Valid {valid}</Typography>
    <Typography aria-hidden sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', transform: 'rotate(-20deg)',
      fontSize: '3rem', fontWeight: 800, color: 'rgba(196,40,28,.18)', pointerEvents: 'none' }}>SAMPLE</Typography>
  </Box>
)

const Section = ({ id, title, children, alt }) => (
  <Box id={id} sx={{ py: 8, bgcolor: alt ? '#FFF4D6' : 'transparent' }}>
    <Container>
      <Typography variant="h4" component="h2" color="primary" gutterBottom>{title}</Typography>
      <Box sx={{ mt: 4 }}>{children}</Box>
    </Container>
  </Box>
)

export default function App() {
  const fromHash = () => NAV.find((n) => n.toLowerCase().replace(' ', '-') === location.hash.slice(1)) || 'Home'
  const [page, setPage] = useState(fromHash)
  const [picked, setPicked] = useState(null)
  useEffect(() => {
    const onHash = () => { setPage(fromHash()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const go = (p) => { location.hash = p.toLowerCase().replace(' ', '-') }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,.9)', backdropFilter: 'blur(8px)', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Box component="img" src="/logo.svg" alt="" sx={{ height: 40 }} />
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
            Kainchi Food Products
          </Typography>
          <Tabs value={NAV.includes(page) ? page : false} textColor="primary" indicatorColor="secondary" onChange={(_, v) => go(v)}
            variant="scrollable" scrollButtons={false} aria-label="Main navigation" sx={{ minWidth: 0, ml: { xs: 'auto', sm: 0 } }}>
            {NAV.map((n) => <Tab key={n} value={n} label={n} />)}
          </Tabs>
        </Toolbar>
      </AppBar>

      {page === 'Home' && <HeroSlider go={go} />}

      {page === 'Home' && <Section id="certifications" title="Certified for food safety and export" alt>
        <Grid container spacing={3}>
          {CERTIFICATES.slice(0, 3).map(([t, i, n, v]) => (
            <Grid key={t} size={{ xs: 12, md: 4 }}><Certificate title={t} issuer={i} no={n} valid={v} /></Grid>
          ))}
        </Grid>
        <Button sx={{ mt: 3 }} onClick={() => go('Gallery')}>View all certificates</Button>
      </Section>}

      {page === 'Home' && <Section id="why-us" title="Why Choose Us">
        <Grid container spacing={4}>
          {WHY.map(([icon, t, d]) => (
            <Grid key={t} size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>{icon}</Avatar>
              <Typography variant="h6">{t}</Typography>
              <Typography color="text.secondary">{d}</Typography>
            </Grid>
          ))}
        </Grid>
      </Section>}

      {page === 'About' && <Section id="about" title="About Us">
        <Typography sx={{ maxWidth: '60ch', fontSize: '1.15rem' }}>
          Kainchi Food Products brings authentic flavour to kitchens and businesses with carefully
          sourced, dehydrated and finely ground spice powders, processed hygienically and packed fresh.
        </Typography>
      </Section>}

      {page === 'About' && <Section id="founder" title="Meet the Founder" alt>
        <Stack spacing={2} sx={{ alignItems: 'center', maxWidth: 640, mx: 'auto', textAlign: 'center' }}>
          <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', fontSize: 40 }}>K</Avatar>
          <Typography variant="h6">Kunal</Typography>
          <Typography color="text.secondary">Founder, Kainchi Food Products</Typography>
          <Typography>
            Kunal started Kainchi Food Products with a simple belief: good food starts with honest
            ingredients. He leads the company with a focus on quality, fair sourcing and long-term
            relationships with customers.
          </Typography>
        </Stack>
      </Section>}

      {page === 'About' && <Section id="quality" title="Quality Control">
        <Grid container spacing={3}>
          {QUALITY.map(([t, d], i) => (
            <Grid key={t} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>{i + 1}</Avatar>
                  <Typography variant="h6" gutterBottom>{t}</Typography>
                  <Typography color="text.secondary">{d}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>}

      {page === 'About' && <Section id="infrastructure" title="Our Infrastructure" alt>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {STATS.map(([v, l]) => (
            <Grid key={l} size={{ xs: 6, md: 3 }} sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>{v}</Typography>
              <Typography color="text.secondary">{l}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          {FACILITIES.map(([t, d]) => (
            <Grid key={t} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{t}</Typography>
                  <Typography color="text.secondary">{d}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>}

      {page === 'Products' && <Section id="products" title="Our Products">
        <Grid container spacing={3}>
          {PRODUCTS.map(([name, desc, color]) => (
            <Grid key={name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <Photo src={color} label={name} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{name}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>{desc}</Typography>
                  <Button size="small" variant="outlined" startIcon={<WhatsAppIcon />} target="_blank" rel="noopener noreferrer"
                    href={waLink(`Hello, I would like a quote for ${name}.`)}>Ask for a quote</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>}

      {page === 'Products' && <Section id="harvest-calendar" title="Harvest Calendar" alt>
        <Typography color="text.secondary" sx={{ mb: 3 }}>When each spice is harvested, so you can plan orders around fresh crop.</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Harvest calendar">
            <TableHead>
              <TableRow>
                <TableCell>Spice</TableCell>
                {MONTHS.map((m) => <TableCell key={m} align="center">{m}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {HARVEST.map(([name, months]) => (
                <TableRow key={name}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>{name}</TableCell>
                  {MONTHS.map((m, i) => (
                    <TableCell key={m} align="center" sx={{ bgcolor: months.includes(i + 1) ? 'secondary.main' : 'transparent' }}>
                      {months.includes(i + 1) && <Box component="span" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Harvest month</Box>}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>}

      {page === 'Gallery' && <Section id="gallery" title="Gallery">
        <Grid container spacing={2}>
          {PRODUCTS.map((p) => (
            <Grid key={p[0]} size={{ xs: 6, md: 4 }}>
              <Card>
                <CardActionArea onClick={() => setPicked(p)} aria-label={`View benefits of ${p[0]}`}>
                  <Photo src={p[2]} label={p[0]} />
                  <Typography variant="caption" sx={{ display: 'block', p: 1, textAlign: 'center' }}>{p[0]}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>}

      {page === 'Gallery' && <Section id="certificates" title="Certificates" alt>
        <Grid container spacing={3}>
          {CERTIFICATES.map(([t, i, n, v]) => (
            <Grid key={t} size={{ xs: 12, sm: 6, md: 4 }}><Certificate title={t} issuer={i} no={n} valid={v} /></Grid>
          ))}
        </Grid>
      </Section>}

      {page === 'Contact' && <Section id="contact" title="Contact Us">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {CONTACT.map(([icon, text]) => (
                <Stack key={text} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>{icon}<Typography>{text}</Typography></Stack>
              ))}
              <Box component="iframe" title="Map" loading="lazy"
                src="https://www.google.com/maps?q=Indore,Madhya+Pradesh&output=embed"
                sx={{ border: 0, width: '100%', height: 260, borderRadius: 1 }} />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
        <Box component="form" action="mailto:info@kainchifoodproducts.in" method="post" encType="text/plain"
          sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <TextField name="name" label="Name" required fullWidth />
            <TextField name="email" label="Email" type="email" required fullWidth />
            <TextField name="message" label="Message" multiline rows={4} required fullWidth />
            <Button type="submit" variant="contained" startIcon={<EmailIcon />}>Send</Button>
          </Stack>
        </Box>
          </Grid>
        </Grid>
      </Section>}

      {page === 'Contact' && <Section id="careers" title="Careers" alt>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Open roles at our Indore plant and office.</Typography>
        <Grid container spacing={3}>
          {JOBS.map(([t, loc, type, d]) => (
            <Grid key={t} size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{t}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{loc}, {type}</Typography>
                  <Typography sx={{ mb: 2 }}>{d}</Typography>
                  <Button variant="outlined" size="small" href={`mailto:careers@kainchifoodproducts.in?subject=${encodeURIComponent('Application: ' + t)}`}>Apply by email</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>}

      <Box component="footer" sx={{ bgcolor: 'primary.main', color: '#fff', pt: 6, pb: 3 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1 }}>
                <Box component="img" src="/logo.svg" alt="" sx={{ height: 40 }} />
                <Typography variant="h6">Kainchi Food Products</Typography>
              </Stack>
              <Typography sx={{ maxWidth: '40ch', opacity: 0.85 }}>Dehydrated spice powders from Indore, packed fresh for kitchens and exporters.</Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant="h6" gutterBottom>Explore</Typography>
              <Stack spacing={0.5}>
                {NAV.map((n) => (
                  <Link key={n} href={`#${n.toLowerCase().replace(' ', '-')}`} color="inherit" underline="hover">{n}</Link>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Typography variant="h6" gutterBottom>Contact</Typography>
              <Stack spacing={0.5}>
                {CONTACT.map(([, text]) => <Typography key={text} variant="body2">{text}</Typography>)}
              </Stack>
              <Stack direction="row" spacing={0.5} sx={{ mt: 2 }}>
                {SOCIALS.map(([name, icon, url]) => (
                  <IconButton key={name} color="inherit" aria-label={name} href={url} target="_blank" rel="noopener noreferrer">{icon}</IconButton>
                ))}
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,.25)' }} />
          <Typography variant="caption" component="p" sx={{ opacity: 0.7, mb: 1 }}>
            Stock photos via Wikimedia Commons: {CREDITS.map(([n, a, l]) => `${n} by ${a} (${l})`).join('; ')}.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>© {new Date().getFullYear()} Kainchi Food Products. All rights reserved.</Typography>
        </Container>
      </Box>
      <Dialog open={!!picked} onClose={() => setPicked(null)} fullWidth maxWidth="sm" aria-labelledby="benefit-title">
        {picked && (<>
          <DialogTitle id="benefit-title" sx={{ pr: 7 }}>
            {picked[0]}
            <IconButton aria-label="Close" onClick={() => setPicked(null)} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent>
            <Photo src={picked[2]} label={picked[0]} sx={{ borderRadius: 2, mb: 2 }} />
            <Typography color="text.secondary">{picked[1]}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Benefits</Typography>
            <List dense>
              {BENEFITS[picked[0]].map((b) => (
                <ListItem key={b} disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}><CheckCircleIcon color="secondary" /></ListItemIcon>
                  <ListItemText primary={b} />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" startIcon={<WhatsAppIcon />} target="_blank" rel="noopener noreferrer" sx={{ mt: 1 }}
              href={waLink(`Hello, I would like a quote for ${picked[0]}.`)}>Ask for a quote</Button>
          </DialogContent>
        </>)}
      </Dialog>

      <Fab variant="extended" href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp"
        sx={{ position: 'fixed', right: 16, bottom: 16, bgcolor: '#25D366', color: '#fff', '&:hover': { bgcolor: '#1ebe5a' } }}>
        <WhatsAppIcon sx={{ mr: 1 }} /> Enquire
      </Fab>
    </ThemeProvider>
  )
}
