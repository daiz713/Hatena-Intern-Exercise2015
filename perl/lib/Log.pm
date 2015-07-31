package Log;
use strict;
use warnings;
use DateTime;
use DateTime::TimeZone;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub protocol {
  my $self = shift;
  my @req = split(/ /, $self->{req});  # ["GET", "/apache_pb.gif", "HTTP/1.0"]
  my $protocol = $req[2];
  return $protocol;
}

sub method {
  my $self = shift;
  my @req = split(/ /, $self->{req});
  my $method = $req[0];
  return $method;
}

sub path {
  my $self = shift;
  my @req = split(/ /, $self->{req});
  my $path = $req[1];
  return $path;
}

sub uri {
  my $self = shift;
  my $host = $self->{host};
  my $path = $self->path;
  return "http://" . $host . $path;
}

sub time {
  my $self = shift;
  my $time = DateTime->from_epoch(
    epoch     => ($self->{epoch}),
    time_zone => 'GMT'
  );
  return $time;
}

# 課題2のテストで使う関数
sub to_hash {
  my $self = shift;
  my $res = {
    status  => $self->{status},
    time    => $self->time,
    method  => $self->method,
    referer => $self->{referer},
    size    => $self->{size},
    uri     => $self->uri
  };

  # p.145
  # あるキーがハッシュの中に存在するかどうかの判定
  if(exists $self->{user}) {
    $res->{user} = $self->{user};
  }

  return $res;
}

1;
