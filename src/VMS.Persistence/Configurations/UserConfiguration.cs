// VMS.Persistence/Configurations/UserConfiguration.cs — add inside Configure()
builder.Property(u => u.PasswordResetOtpHash).HasMaxLength(64); // SHA256 hex = 64 chars