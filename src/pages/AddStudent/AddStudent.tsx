// AddStudent.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Camera, X, ZoomIn, Trash2 } from 'lucide-react';
import paths from 'routes/paths';

// Types
interface StudentForm {
  name: string;
  pic: File | string;
  dateOfAdmission: string;
  class: string;
  dob: string;
  cnic: string;
  gender: string;
  religion: string;
  bloodGroup: string;
  disease: string;
  address: string;
  siblings: string;
  studentContact: string;
  fatherName: string;
  fatherEducation: string;
  fatherProfession: string;
  fatherMobile: string;
  motherName: string;
  motherEducation: string;
  motherProfession: string;
  motherMobile: string;
}

// Image Preview Component
interface ImagePreviewProps {
  src: string;
  onRemove: () => void;
  alt?: string;
}

const ImagePreview = ({ src, onRemove, alt = "Preview" }: ImagePreviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box sx={{ position: 'relative', mt: 1 }}>
      <Box 
        sx={{ 
          position: 'relative',
          '&:hover .image-controls': { opacity: 1 }
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
        <Box
          className="image-controls"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 1,
            opacity: 0,
            transition: 'opacity 0.2s',
            display: 'flex',
            gap: 1,
            background: 'rgba(0,0,0,0.5)',
            borderTopRightRadius: '8px',
            borderBottomLeftRadius: '8px'
          }}
        >
          <IconButton 
            size="small" 
            onClick={() => setIsDialogOpen(true)}
            sx={{ color: 'white' }}
          >
            <ZoomIn size={20} />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={onRemove}
            sx={{ color: 'white' }}
          >
            <Trash2 size={20} />
          </IconButton>
        </Box>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 1, position: 'relative' }}>
          <IconButton
            onClick={() => setIsDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <X size={20} />
          </IconButton>
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

// Image Upload Component
interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  hasImage: boolean;
}

const ImageUpload = ({ onImageSelect, hasImage }: ImageUploadProps) => {
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      onImageSelect(file);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="pic-upload"
        type="file"
        onChange={handleFileSelect}
      />
      <label htmlFor="pic-upload">
        <Button
        
          component="span"
          fullWidth
          startIcon={<Camera />}
          sx={{
            height: '56px',
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            color: 'rgba(0, 0, 0, 0.87)',
            justifyContent: 'flex-start',
            paddingLeft: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
              border: '1px solid #bdbdbd',
            }
          }}
        >
          {hasImage ? 'Change Student Photo' : 'Upload Student Photo'}
        </Button>
      </label>
    </Box>
  );
};

// Main Component
const AddStudent = () => {
  const [student, setStudent] = useState<StudentForm>({
    name: '',
    pic: '',
    dateOfAdmission: '',
    class: '',
    dob: '',
    cnic: '',
    gender: '',
    religion: '',
    bloodGroup: '',
    disease: '',
    address: '',
    siblings: '',
    studentContact: '',
    fatherName: '',
    fatherEducation: '',
    fatherProfession: '',
    fatherMobile: '',
    motherName: '',
    motherEducation: '',
    motherProfession: '',
    motherMobile: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const textFieldSx = {
    mb: 2,
    '& .MuiFilledInput-root': {
      border: '1px solid #e0e0e0',
      borderRadius: 1,
      '&:hover': {
        border: '1px solid #bdbdbd',
      },
      '&.Mui-focused': {
        border: '1px solid #1976d2',
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (file: File) => {
    setStudent(prev => ({
      ...prev,
      pic: file
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setStudent(prev => ({
      ...prev,
      pic: ''
    }));
    setImagePreview('');
    // Clear the file input
    const fileInput = document.getElementById('pic-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all student data
      Object.entries(student).forEach(([key, value]) => {
        if (key === 'pic' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      // Here you would typically send the formData to your API
      console.log('Form submitted:', formData);
      
      // Add your API call here
      // const response = await fetch('/api/students', {
      //   method: 'POST',
      //   body: formData
      // });

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error appropriately
    }
  };

  return (
    <Stack mx="auto" direction="column" alignItems="center" width={1} maxWidth={800}>
      <Typography mt={4} variant="h2" fontWeight={600}>
        Addmission Form
      </Typography>

      <Divider sx={{ my: 4.5, width: '100%' }}>Trakie By The Logic Lounge</Divider>


        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" sx={{ mb: 6, color: 'primary.main' }}>
            Student Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                name="name"
                label="Student Name"
                value={student.name}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
                required         
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <ImageUpload 
                onImageSelect={handleImageSelect}
                hasImage={!!imagePreview}
              />
              {imagePreview && (
                <ImagePreview
                  src={imagePreview}
                  onRemove={handleRemoveImage}
                  alt="Student photo"
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="dateOfAdmission"
                name="dateOfAdmission"
                label="Date of Admission"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={student.dateOfAdmission}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
                required
                sx={textFieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6} mt={2}>
              <TextField
                id="class"
                name="class"
                label="Class"
                select
                value={student.class}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
                required
                sx={textFieldSx}
              >
                <MenuItem value="Class 1">Class 1</MenuItem>
                <MenuItem value="Class 2">Class 2</MenuItem>
                <MenuItem value="Class 3">Class 3</MenuItem>
              </TextField>
            </Grid>
          </Grid>

         {/* Section 2: Other Information */}
         <Typography variant="h5" sx={{ mt: 4, mb: 6, color: 'primary.main' }}>
            Other Information
          </Typography>
          <Grid container spacing={2}>
            {[
              { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
              { id: 'cnic', label: 'CNIC/B-Form', required: true },
              { id: 'gender', label: 'Gender', select: true, required: true },
              { id: 'religion', label: 'Religion' },
              { id: 'bloodGroup', label: 'Blood Group' },
              { id: 'disease', label: 'Disease (if any)' },
              { id: 'siblings', label: 'Total Number of Siblings', type: 'number' },
              { id: 'studentContact', label: 'Contact Number (Student)' },
            ].map((field) => (
              <Grid item xs={12} md={6} key={field.id}>
                <TextField
                  id={field.id}
                  name={field.id}
                  label={field.label}
                  type={field.type}
                  select={field.select}
                  value={student[field.id as keyof typeof student]}
                  onChange={handleInputChange}
                  variant="filled"
                  fullWidth
                  required={field.required}
                  InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                  sx={textFieldSx}

                >
                  {field.select && (
                    <>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </>
                  )}
                </TextField>
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Address"
                value={student.address}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
                multiline
                rows={2}
                sx={textFieldSx}

              />
            </Grid>
          </Grid>

          {/* Section 3: Father Information */}
          <Typography variant="h5" sx={{ mt: 4, mb: 6, color: 'primary.main' }}>
            Father Information
          </Typography>
          <Grid container spacing={2}>
            {['fatherName', 'fatherEducation', 'fatherProfession', 'fatherMobile'].map((field) => (
              <Grid item xs={12} md={6} key={field}>
                <TextField
                  id={field}
                  name={field}
                  label={field.replace('father', 'Father ').replace(/([A-Z])/g, ' $1').trim()}
                  value={student[field as keyof typeof student]}
                  onChange={handleInputChange}
                  variant="filled"
                  fullWidth
                  required={field === 'fatherName'}
                  sx={textFieldSx}

                />
              </Grid>
            ))}
          </Grid>

          {/* Section 4: Mother Information */}
          <Typography variant="h5" sx={{ mt: 4, mb: 6, color: 'primary.main' }}>
            Mother Information
          </Typography>
          <Grid container spacing={2}>
            {['motherName', 'motherEducation', 'motherProfession', 'motherMobile'].map((field) => (
              <Grid item xs={12} md={6} key={field}>
                <TextField
                  id={field}
                  name={field}
                  label={field.replace('mother', 'Mother ').replace(/([A-Z])/g, ' $1').trim()}
                  value={student[field as keyof typeof student]}
                  onChange={handleInputChange}
                  variant="filled"
                  fullWidth
                  required={field === 'motherName'}
                  sx={textFieldSx}

                />
              </Grid>
            ))}
          </Grid>
          
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ mt: 4 }} 
            fullWidth
          >
            Register Student
          </Button>
        </Box>
      

      <Typography
        mt={4}
        pb={12}
        variant="body2"
        textAlign={{ xs: 'center', md: 'left' }}
        letterSpacing={0.25}
      >
        Student Added!{' '}
        <Link href={paths.dashboard} color="primary.main" fontWeight={600}>
          Go to Dashboard
        </Link>
      </Typography>
    </Stack>
  );
};

export default AddStudent;